using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NPCInteraction : MonoBehaviour
{
    public GameObject conversationInterface;
    public bool isPlayerApproach = false;
    private NPCController npcController; // Reference to the NPCController script

    void Start()
    {
        npcController = GetComponent<NPCController>(); // Get the NPCController component
    }

    void Update()
    {
        if (isPlayerApproach && Input.GetKeyDown(KeyCode.P))
        {
            if (conversationInterface != null)
            {
                bool isConversationActive = conversationInterface.activeSelf;
                conversationInterface.SetActive(!isConversationActive);

                if (!isConversationActive)
                {
                    // Interaction starts, stop NPC and face the player
                    npcController.StopAndFacePlayer(GameObject.FindWithTag("Player").transform);
                    Debug.Log("Dialog opened, NPC stops and faces the player.");
                }
                else
                {
                    // Interaction ends, NPC resumes movement
                    npcController.ResumeMovement();
                    Debug.Log("Dialog closed, NPC resumes movement.");
                }
            }
        }
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            isPlayerApproach = true;
            Debug.Log("Player is near NPC");
        }
    }

    void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            isPlayerApproach = false;
            Debug.Log("Player left NPC interaction range");
        }
    }
}