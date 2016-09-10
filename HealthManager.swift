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
    // Set the types you want to read from HK Store
    let healthKitTypesToRead : Set<HKObjectType> = [HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierHeight)!]
    
    // If the store is not available (for instance, iPad) return an error and don't go on.
    if !HKHealthStore.isHealthDataAvailable()
    {
        let error = NSError(domain: "com.raywenderlich.tutorials.healthkit", code: 2, userInfo: [NSLocalizedDescriptionKey:"HealthKit is not available in this Device"])
        if( completion != nil )
        {
            completion(success:false, error:error)
        }
        return;
    }
    
    // Request HealthKit authorization
    healthKitStore.requestAuthorizationToShareTypes(Set(), readTypes: healthKitTypesToRead) { (success, error) -> Void in
        
        if( completion != nil )
        {
            completion(success:success,error:error)
        }
    }
}


