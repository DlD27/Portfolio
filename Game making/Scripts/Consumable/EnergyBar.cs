using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnergyBar : Consumable
{
    public float speedBoost = 5f; 
    public float boostDuration = 30f; // duration of the speed boost

    public override void Consume(PlayerStats playerStats)
    {
        StartCoroutine(ApplySpeedBoost(playerStats)); // Start the coroutine to handle the speed boost
        Destroy(gameObject); 
    }

    private IEnumerator ApplySpeedBoost(PlayerStats playerStats)
    {
        
        playerStats.ChangeSpeed(speedBoost); 

        yield return new WaitForSeconds(boostDuration); // Wait for the boost duration (30 seconds)

        playerStats.ChangeSpeed(-speedBoost); 
    }
}