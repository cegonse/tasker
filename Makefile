android:
	@cordova build android
	@cp /home/user/tasker_src/platforms/android/app/build/outputs/apk/debug/app-debug.apk ~/tasker/tasker.apk

browser:
	@cordova build browser
	@./start.sh
