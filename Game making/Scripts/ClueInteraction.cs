using UnityEngine;

public class ClueInteractionRaycast : MonoBehaviour
{
    public GameObject clueUI; // Reference to the ClueScrollArea UI
    public Transform playerCamera; // Reference to the player's camera
    public float interactionDistance = 3f; // Maximum interaction distance

    private GameObject currentClue; // To store the currently targeted clue object
    private bool isUIActive = false; // Track if the UI is active

    void Update()
    {
        // If the UI is currently active, allow it to be closed regardless of where the player is pointing
        if (isUIActive && Input.GetKeyDown(KeyCode.E))
        {
            ToggleClueUI(false); // Close the UI
            return; // No need to process further if the UI is toggled off
        }

        // Raycasting logic only if the UI is not active
        RaycastForClue();

        // Check if the player presses E while looking at the clue
        if (currentClue != null && Input.GetKeyDown(KeyCode.E))
        {
            ToggleClueUI(true); // Open the UI
        }
    }

    void RaycastForClue()
    {
        Ray ray = new Ray(playerCamera.position, playerCamera.forward); // Raycast from the player's camera
        RaycastHit hit;

        // Perform raycast to check if the player is looking at a clue within interaction range
        if (Physics.Raycast(ray, out hit, interactionDistance))
        {
            if (hit.collider.CompareTag("Clue"))
            {
                currentClue = hit.collider.gameObject;
                Debug.Log(currentClue);
            }
            else
            {
                currentClue = null; // Clear if not looking at a clue
            }
        }
        else
        {
            currentClue = null; // Clear if not looking at a clue
        }
    }

    void ToggleClueUI(bool showUI)
    {
        clueUI.SetActive(showUI);
        isUIActive = showUI; // Track if the UI is open or closed
    }
}
