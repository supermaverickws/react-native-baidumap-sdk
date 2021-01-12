#import <React/RCTEventEmitter.h>
#import <BMKLocationKit/BMKLocationComponent.h>
#import "RCTUserLocation.h"

@interface RCTLocationModule : RCTEventEmitter <RCTBridgeModule, BMKLocationManagerDelegate>
@end

@implementation RCTLocationModule {
    BMKLocationManager *_service;
    RCTUserLocation *_location;
    BOOL _initialized;
}

RCT_EXPORT_MODULE(BaiduMapLocation)

RCT_EXPORT_METHOD(setOptions:(NSDictionary *)options) {
    if (options[@"distanceFilter"]) {
        _service.distanceFilter = [options[@"distanceFilter"] doubleValue];
    }
}

RCT_REMAP_METHOD(init, resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if (!_initialized) {
        _initialized = YES;
        _location = [RCTUserLocation new];
        dispatch_async(dispatch_get_main_queue(), ^{
            self->_service =  [[BMKLocationManager alloc] init];
            self->_service.desiredAccuracy = kCLLocationAccuracyBest;
            //设置返回位置的坐标系类型
            self->_service.coordinateType = BMKLocationCoordinateTypeBMK09LL;
            //设置距离过滤参数
            self->_service.distanceFilter = kCLDistanceFilterNone;
            //设置预期精度参数
            self->_service.desiredAccuracy = kCLLocationAccuracyBest;
            //设置应用位置类型
            self->_service.activityType = CLActivityTypeAutomotiveNavigation;
            //设置是否自动停止位置更新
            self->_service.pausesLocationUpdatesAutomatically = NO;
            //设置是否允许后台定位
            self->_service.allowsBackgroundLocationUpdates = YES;
            //设置位置获取超时时间
            self->_service.locationTimeout = 10;
            //设置获取地址信息超时时间
            self->_service.reGeocodeTimeout = 10;
            self->_service.delegate = self;
            resolve(nil);
        });
    } else {
        resolve(nil);
    }
}

RCT_EXPORT_METHOD(start) {
    [_service startUpdatingLocation];
}

RCT_EXPORT_METHOD(stop) {
    [_service stopUpdatingLocation];
}

- (void)didUpdateBMKUserLocation:(BMKLocation *)userLocation {
    [_location updateWithCLLocation:userLocation.location];
    [self sendEventWithName:@"baiduMapLocation" body: _location.json];
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"baiduMapLocation"];
}

@end
