using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ToolbarScript : MonoBehaviour
{
    public Image[] toolbarSlots; // Array to hold references to the UI Image components for the toolbar slots
    private Dictionary<int, Sprite> slotSprites = new Dictionary<int, Sprite>(); // To keep track of the sprites in each slot

    // Assign an image to a specific slot
    public void SetSlotImage(int slotIndex, Sprite itemSprite)
    {
        if (slotIndex >= 0 && slotIndex < toolbarSlots.Length)
        {
            toolbarSlots[slotIndex].sprite = itemSprite;
            toolbarSlots[slotIndex].enabled = true; // Ensure the image is visible
            slotSprites[slotIndex] = itemSprite; // Track the sprite in the dictionary
        }
        else
        {
            Debug.LogError("Slot index out of range!");
        }
    }

    // Clear the image from a specific slot
    public void ClearSlotImage(int slotIndex)
    {
        if (slotIndex >= 0 && slotIndex < toolbarSlots.Length)
        {
            toolbarSlots[slotIndex].sprite = null;
            toolbarSlots[slotIndex].enabled = false; // Hide the image
            slotSprites.Remove(slotIndex); // Remove from the dictionary
        }
        else
        {
            Debug.LogError("Slot index out of range!");
        }
    }

    // Get the sprite of a specific slot (optional)
    public Sprite GetSlotImage(int slotIndex)
    {
        if (slotSprites.ContainsKey(slotIndex))
        {
            return slotSprites[slotIndex];
        }
        return null;
    }
}