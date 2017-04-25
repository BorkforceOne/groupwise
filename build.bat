rmdir /s /q "dist"
cd client
call ng build --prod --aot false
cd ..
xcopy "client\dist" "dist\www\*" /s /e
xcopy "server\templates" "dist\templates\*" /s /e
xcopy "server\src" "dist\src\*" /s /e
xcopy "server\package.json" "dist\*"
