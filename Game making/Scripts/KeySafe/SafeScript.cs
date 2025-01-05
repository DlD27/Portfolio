using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SafeScript : MonoBehaviour
{
    public GameObject key; 
    public GameObject clueInterface; 
    public bool isPlayerApproach = false; 
    public AudioClip lockedSound; 
    private AudioSource audioSource;

    void Start()
    {
        audioSource = GetComponent<AudioSource>(); 
    }

    
    void Update()
    {
        if (isPlayerApproach && Input.GetKeyDown(KeyCode.P))
        {
            // Check if the key is inactive (i.e., picked up by the player)
            if (key != null && !key.activeSelf)
            {
                // Toggle the clue interface visibility if the player has the key
                if (clueInterface != null)
                {
                    clueInterface.SetActive(!clueInterface.activeSelf);
                    Debug.Log(clueInterface.activeSelf ? "Dialog opened" : "Dialog closed");
                }
            }
            else
            {
                // Play locked sound if the player does not have the key
                if (lockedSound != null && audioSource != null)
                {
                    audioSource.PlayOneShot(lockedSound);
                }
            }
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        // Check if the player enters the trigger zone
        if (other.CompareTag("Player")) // Ensure the player object has the "Player" tag
        {
            isPlayerApproach = true; // Player is near the safe
        }
    }

    private void OnTriggerExit(Collider other)
    {
        // Check if the player exits the trigger zone
        if (other.CompareTag("Player"))
        {
            isPlayerApproach = false; // Player is no longer near the safe
        }
    }
}
