package com.frontend   // ⚠️ change to your package name (check AndroidManifest.xml)

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat

object CustomNotification {
    fun buildNotification(context: Context, start: Int, end: Int, progress: Int): Notification {
        val channelId = "custom_progress_channel"

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Custom Progress",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = context.getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }

        val remoteViews = RemoteViews(context.packageName, R.layout.custom_notification)
        remoteViews.setTextViewText(R.id.startLabel, start.toString())
        remoteViews.setTextViewText(R.id.endLabel, end.toString())
        remoteViews.setProgressBar(R.id.progressBar, end, progress, false)

        return NotificationCompat.Builder(context, channelId)
            .setSmallIcon(R.mipmap.ic_launcher) // your app icon
            .setStyle(NotificationCompat.DecoratedCustomViewStyle())
            .setCustomContentView(remoteViews)
            .build()
    }
}
