package com.frontend   // ⚠️ must match your package name

import android.app.NotificationManager
import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CustomNotificationModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CustomNotification"

    @ReactMethod
    fun show(start: Int, end: Int, progress: Int) {
        val context = reactApplicationContext
        val notification = CustomNotification.buildNotification(context, start, end, progress)
        val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        manager.notify(1, notification) // ID = 1 (same ID → update progress)
    }
}
