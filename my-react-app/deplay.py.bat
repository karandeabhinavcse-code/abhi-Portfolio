@echo off
title Auto Deploy

git add .
git commit -m "Auto Update"
git push

echo.
echo Website updated! Waiting for Vercel...
pause