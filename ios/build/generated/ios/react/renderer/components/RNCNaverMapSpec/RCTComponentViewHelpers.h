/**
* This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
*
* Do not edit this file as changes may cause incorrect behavior and will be lost
* once the code is regenerated.
*
* @generated by codegen project: GenerateComponentHObjCpp.js
*/

#import <Foundation/Foundation.h>
#import <React/RCTDefines.h>
#import <React/RCTLog.h>

NS_ASSUME_NONNULL_BEGIN

@protocol RCTRNCNaverMapCircleViewProtocol <NSObject>

@end

@protocol RCTRNCNaverMapMarkerViewProtocol <NSObject>

@end

@protocol RCTRNCNaverMapPathViewProtocol <NSObject>

@end

@protocol RCTRNCNaverMapPolygonViewProtocol <NSObject>

@end

@protocol RCTRNCNaverMapPolylineViewProtocol <NSObject>

@end

@protocol RCTRNCNaverMapViewViewProtocol <NSObject>
- (void)screenToCoordinate:(double)x y:(double)y;
- (void)coordinateToScreen:(double)latitude longitude:(double)longitude;
- (void)animateCameraTo:(double)latitude longitude:(double)longitude duration:(NSInteger)duration easing:(NSInteger)easing pivotX:(double)pivotX pivotY:(double)pivotY zoom:(double)zoom;
- (void)animateCameraBy:(double)x y:(double)y duration:(NSInteger)duration easing:(NSInteger)easing pivotX:(double)pivotX pivotY:(double)pivotY;
- (void)animateRegionTo:(double)latitude longitude:(double)longitude latitudeDelta:(double)latitudeDelta longitudeDelta:(double)longitudeDelta duration:(NSInteger)duration easing:(NSInteger)easing pivotX:(double)pivotX pivotY:(double)pivotY;
- (void)cancelAnimation;
- (void)setLocationTrackingMode:(NSString *)mode;
@end

RCT_EXTERN inline void RCTRNCNaverMapViewHandleCommand(
  id<RCTRNCNaverMapViewViewProtocol> componentView,
  NSString const *commandName,
  NSArray const *args)
{
  if ([commandName isEqualToString:@"screenToCoordinate"]) {
#if RCT_DEBUG
  if ([args count] != 2) {
    RCTLogError(@"%@ command %@ received %d arguments, expected %d.", @"RNCNaverMapView", commandName, (int)[args count], 2);
    return;
  }
#endif

  NSObject *arg0 = args[0];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg0, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"1st")) {
    return;
  }
#endif
  double x = [(NSNumber *)arg0 doubleValue];

NSObject *arg1 = args[1];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg1, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"2nd")) {
    return;
  }
#endif
  double y = [(NSNumber *)arg1 doubleValue];

  [componentView screenToCoordinate:x y:y];
  return;
}

if ([commandName isEqualToString:@"coordinateToScreen"]) {
#if RCT_DEBUG
  if ([args count] != 2) {
    RCTLogError(@"%@ command %@ received %d arguments, expected %d.", @"RNCNaverMapView", commandName, (int)[args count], 2);
    return;
  }
#endif

  NSObject *arg0 = args[0];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg0, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"1st")) {
    return;
  }
#endif
  double latitude = [(NSNumber *)arg0 doubleValue];

NSObject *arg1 = args[1];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg1, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"2nd")) {
    return;
  }
#endif
  double longitude = [(NSNumber *)arg1 doubleValue];

  [componentView coordinateToScreen:latitude longitude:longitude];
  return;
}

if ([commandName isEqualToString:@"animateCameraTo"]) {
#if RCT_DEBUG
  if ([args count] != 7) {
    RCTLogError(@"%@ command %@ received %d arguments, expected %d.", @"RNCNaverMapView", commandName, (int)[args count], 7);
    return;
  }
#endif

  NSObject *arg0 = args[0];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg0, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"1st")) {
    return;
  }
#endif
  double latitude = [(NSNumber *)arg0 doubleValue];

NSObject *arg1 = args[1];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg1, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"2nd")) {
    return;
  }
#endif
  double longitude = [(NSNumber *)arg1 doubleValue];

NSObject *arg2 = args[2];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg2, [NSNumber class], @"number", @"RNCNaverMapView", commandName, @"3rd")) {
    return;
  }
#endif
  NSInteger duration = [(NSNumber *)arg2 intValue];

NSObject *arg3 = args[3];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg3, [NSNumber class], @"number", @"RNCNaverMapView", commandName, @"4th")) {
    return;
  }
#endif
  NSInteger easing = [(NSNumber *)arg3 intValue];

NSObject *arg4 = args[4];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg4, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"5th")) {
    return;
  }
#endif
  double pivotX = [(NSNumber *)arg4 doubleValue];

NSObject *arg5 = args[5];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg5, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"6th")) {
    return;
  }
#endif
  double pivotY = [(NSNumber *)arg5 doubleValue];

NSObject *arg6 = args[6];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg6, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"7th")) {
    return;
  }
#endif
  double zoom = [(NSNumber *)arg6 doubleValue];

  [componentView animateCameraTo:latitude longitude:longitude duration:duration easing:easing pivotX:pivotX pivotY:pivotY zoom:zoom];
  return;
}

if ([commandName isEqualToString:@"animateCameraBy"]) {
#if RCT_DEBUG
  if ([args count] != 6) {
    RCTLogError(@"%@ command %@ received %d arguments, expected %d.", @"RNCNaverMapView", commandName, (int)[args count], 6);
    return;
  }
#endif

  NSObject *arg0 = args[0];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg0, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"1st")) {
    return;
  }
#endif
  double x = [(NSNumber *)arg0 doubleValue];

NSObject *arg1 = args[1];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg1, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"2nd")) {
    return;
  }
#endif
  double y = [(NSNumber *)arg1 doubleValue];

NSObject *arg2 = args[2];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg2, [NSNumber class], @"number", @"RNCNaverMapView", commandName, @"3rd")) {
    return;
  }
#endif
  NSInteger duration = [(NSNumber *)arg2 intValue];

NSObject *arg3 = args[3];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg3, [NSNumber class], @"number", @"RNCNaverMapView", commandName, @"4th")) {
    return;
  }
#endif
  NSInteger easing = [(NSNumber *)arg3 intValue];

NSObject *arg4 = args[4];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg4, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"5th")) {
    return;
  }
#endif
  double pivotX = [(NSNumber *)arg4 doubleValue];

NSObject *arg5 = args[5];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg5, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"6th")) {
    return;
  }
#endif
  double pivotY = [(NSNumber *)arg5 doubleValue];

  [componentView animateCameraBy:x y:y duration:duration easing:easing pivotX:pivotX pivotY:pivotY];
  return;
}

if ([commandName isEqualToString:@"animateRegionTo"]) {
#if RCT_DEBUG
  if ([args count] != 8) {
    RCTLogError(@"%@ command %@ received %d arguments, expected %d.", @"RNCNaverMapView", commandName, (int)[args count], 8);
    return;
  }
#endif

  NSObject *arg0 = args[0];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg0, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"1st")) {
    return;
  }
#endif
  double latitude = [(NSNumber *)arg0 doubleValue];

NSObject *arg1 = args[1];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg1, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"2nd")) {
    return;
  }
#endif
  double longitude = [(NSNumber *)arg1 doubleValue];

NSObject *arg2 = args[2];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg2, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"3rd")) {
    return;
  }
#endif
  double latitudeDelta = [(NSNumber *)arg2 doubleValue];

NSObject *arg3 = args[3];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg3, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"4th")) {
    return;
  }
#endif
  double longitudeDelta = [(NSNumber *)arg3 doubleValue];

NSObject *arg4 = args[4];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg4, [NSNumber class], @"number", @"RNCNaverMapView", commandName, @"5th")) {
    return;
  }
#endif
  NSInteger duration = [(NSNumber *)arg4 intValue];

NSObject *arg5 = args[5];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg5, [NSNumber class], @"number", @"RNCNaverMapView", commandName, @"6th")) {
    return;
  }
#endif
  NSInteger easing = [(NSNumber *)arg5 intValue];

NSObject *arg6 = args[6];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg6, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"7th")) {
    return;
  }
#endif
  double pivotX = [(NSNumber *)arg6 doubleValue];

NSObject *arg7 = args[7];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg7, [NSNumber class], @"double", @"RNCNaverMapView", commandName, @"8th")) {
    return;
  }
#endif
  double pivotY = [(NSNumber *)arg7 doubleValue];

  [componentView animateRegionTo:latitude longitude:longitude latitudeDelta:latitudeDelta longitudeDelta:longitudeDelta duration:duration easing:easing pivotX:pivotX pivotY:pivotY];
  return;
}

if ([commandName isEqualToString:@"cancelAnimation"]) {
#if RCT_DEBUG
  if ([args count] != 0) {
    RCTLogError(@"%@ command %@ received %d arguments, expected %d.", @"RNCNaverMapView", commandName, (int)[args count], 0);
    return;
  }
#endif

  

  [componentView cancelAnimation];
  return;
}

if ([commandName isEqualToString:@"setLocationTrackingMode"]) {
#if RCT_DEBUG
  if ([args count] != 1) {
    RCTLogError(@"%@ command %@ received %d arguments, expected %d.", @"RNCNaverMapView", commandName, (int)[args count], 1);
    return;
  }
#endif

  NSObject *arg0 = args[0];
#if RCT_DEBUG
  if (!RCTValidateTypeOfViewCommandArgument(arg0, [NSString class], @"string", @"RNCNaverMapView", commandName, @"1st")) {
    return;
  }
#endif
  NSString * mode = (NSString *)arg0;

  [componentView setLocationTrackingMode:mode];
  return;
}

#if RCT_DEBUG
  RCTLogError(@"%@ received command %@, which is not a supported command.", @"RNCNaverMapView", commandName);
#endif
}

NS_ASSUME_NONNULL_END