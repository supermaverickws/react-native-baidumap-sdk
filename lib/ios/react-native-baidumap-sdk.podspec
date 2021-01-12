require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../../package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.authors      = { "7c00" => "i@7c00.cc" }
  s.homepage     = package['repository']['url']
  s.license      = package['license']
  s.platform     = :ios, "9.0"

  s.source       = { :git => package['repository']['url'] }
  s.source_files = '**/*.{h,m}'
  s.resource_bundles = {
    'react-native-baidumap-sdk' => 'Resources/*.{png}',
  }
  s.dependency 'React'
  s.dependency 'BaiduMapKit', "~> 6.1.0"
  s.dependency 'BMKLocationKit', "~> 2.0.0"
end
