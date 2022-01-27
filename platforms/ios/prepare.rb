#import the xcodeproj ruby gem
require 'xcodeproj'
require 'json'
app_id = ARGV[0]
files = []
#define the path to your .xcodeproj file
project_path = 'vnf3/vnf3.xcodeproj'
buildData = JSON.parse(File.read('./build.json'))
buildCount = 0
#open the xcode project
project = Xcodeproj::Project.open(project_path)
#find the group on which you want to add the file
group = project.main_group["vnf3"]
#get the file reference for the file to add
main_target = project.targets.first
while buildData.length() > buildCount do
    files[buildCount] = group.new_file(buildData[buildCount])
    #finally, save the project
    buildCount = buildCount + 1
end     
#add the file reference to the projects first target
main_target.add_resources(files)

project.save