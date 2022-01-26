#import the xcodeproj ruby gem
require 'xcodeproj'
require 'json'
app_id = ARGV[0]
#define the path to your .xcodeproj file
project_path = 'vnf3/vnf3.xcodeproj'
buildData = JSON.parse(File.read('./build.json'))
buildCount = 0
#open the xcode project
project = Xcodeproj::Project.open(project_path)
#find the group on which you want to add the file
group = project.main_group["vnf3"]
#get the file reference for the file to add
while buildData.length() > buildCount do
    file = group.new_file(buildData[buildCount])
    #add the file reference to the projects first target
    main_target = project.targets.first
    main_target.remove_reference([file])
    main_target.add_file_references([file])
    #finally, save the project
    buildCount = buildCount + 1
end     

project.save