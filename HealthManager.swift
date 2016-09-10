//
//  HealthManager.swift
//  CardiacSensor
//
//  Created by Joseph Raso on 9/9/16.
//  Copyright © 2016 Arrested Development. All rights reserved.
//

import Foundation
import HealthKit

let healthKitStore:HKHealthStore = HKHealthStore()

func authorizeHealthKit(completion: ((success:Bool, error:NSError!) -> Void)!)
{
    // 1. Set the types you want to read from HK Store
    let healthKitTypesToRead = Set(arrayLiteral:[
        HKObjectType.characteristicTypeForIdentifier(HKCharacteristicTypeIdentifierDateOfBirth),
        HKObjectType.characteristicTypeForIdentifier(HKCharacteristicTypeIdentifierBloodType),
        HKObjectType.characteristicTypeForIdentifier(HKCharacteristicTypeIdentifierBiologicalSex),
        HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierBodyMass),
        HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierHeight),
        HKObjectType.workoutType()
        ])
    
    // 2. Set the types you want to write to HK Store
    let healthKitTypesToWrite = Set(arrayLiteral:[
        HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierBodyMassIndex),
        HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierActiveEnergyBurned),
        HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierDistanceWalkingRunning),
        HKQuantityType.workoutType()
        ])
    
    // 3. If the store is not available (for instance, iPad) return an error and don't go on.
    if !HKHealthStore.isHealthDataAvailable()
    {
        let error = NSError(domain: "com.raywenderlich.tutorials.healthkit", code: 2, userInfo: [NSLocalizedDescriptionKey:"HealthKit is not available in this Device"])
        if( completion != nil )
        {
            completion(success:false, error:error)
        }
        return;
    }
    
    // 4.  Request HealthKit authorization
    healthKitStore.requestAuthorizationToShareTypes(healthKitTypesToWrite, readTypes: healthKitTypesToRead) { (success, error) -> Void in
        
        if( completion != nil )
        {
            completion(success:success,error:error)
        }
    }
}


