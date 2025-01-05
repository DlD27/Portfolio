using UnityEngine;

public class KeyScript : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        // Check if the player collides with the key
        if (other.CompareTag("Player"))
        {
            // Deactivate the key to "add" it to the player's inventory
            gameObject.SetActive(false);
            Debug.Log("Key picked up!");
        }
    }
}
