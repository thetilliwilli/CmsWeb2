ROBOCOPY Server ../CmsWebBuild/Server *.* /E /IS
ROBOCOPY Static ../CmsWebBuild/Static *.* /E /IS
ROBOCOPY WebRoot ../CmsWebBuild/WebRoot *.* /E /IS
ROBOCOPY WebRootAuth ../CmsWebBuild/WebRootAuth *.* /E /IS
ROBOCOPY . ../CmsWebBuild *.json *.js /IS
$commitMessage=(git log --format=%B -1)
cd ../CmsWebBuild
git add -A
git commit -m "$commitMessage" --amend
git push -f https://thetilliwilli:redfack5@github.com/thetilliwilli/CmsWebBuild.git master
