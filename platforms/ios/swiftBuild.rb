#import the xcodeproj ruby gem
require 'xcodeproj'
require 'json'
fileName = ARGV[0]
#define the path to your .xcodeproj file
project_path = 'vnf3/vnf3.xcodeproj'
#open the xcode project
project = Xcodeproj::Project.open(project_path)
#find the group on which you want to add the file
group = project.main_group["vnf3"]
#get the file reference for the file to add
main_target = project.targets.first
files = []
files[0] = group.new_file(fileName)    
#add the file reference to the projects first target
main_target.add_resources(files)
project.save