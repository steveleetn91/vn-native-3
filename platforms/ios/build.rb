require 'rubygems'
require 'xcodeproject'

proj = XcodeProject::Project.new('vnf3/vnf3.xcodeproj')
proj.read.targets.each do |target|
	puts target.name
end
data = proj.read
target = data.target('vnf3')
data.main_group.children.each do |child|
	p child.name
end
group = data.group("vnf3")
p target.config('Release').build_settings