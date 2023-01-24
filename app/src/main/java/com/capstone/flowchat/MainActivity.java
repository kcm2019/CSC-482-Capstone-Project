package com.capstone.flowchat;

import androidx.appcompat.app.AppCompatActivity;
import android.text.TextUtils;
import android.text.method.ScrollingMovementMethod;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import io.agora.CallBack;
import io.agora.ConnectionListener;
import io.agora.chat.ChatClient;
import io.agora.chat.ChatMessage;
import io.agora.chat.ChatOptions;
import io.agora.chat.TextMessageBody;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    // Replaces <Your username>, <Your token>, and <Your AppKey> with your own App Key, user ID, and user token generated in Agora Console.
    private static final String USERNAME = "1234Kurt";
    private static final String TOKEN = "007eJxTYIg/1/XfYc2PY+t3Lv8iX8EVaVqT/e6pfaXii6ka6tsLbl9RYDBPTEw0SjFINEs0TDMxMTO3SElLTjFNTkk0S0syNLc0Ptt+JrkhkJHhbXEIIyMDKwMjEIL4KgwWFpYWyYbGBrqWlqlJuoaGqSm6FibGprrGphZm5kYphiYWxskAzaQqJg==";
    private static final String APP_KEY = "41847041#1042363";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
        initSDK();
        initListener();
    }
    // Initializes the view.
    private void initView() {
        ((TextView)findViewById(R.id.tv_log)).setMovementMethod(new ScrollingMovementMethod());
    }
    // Initializes the SDK.
    private void initSDK() {
        ChatOptions options = new ChatOptions();
        // Gets your App Key from Agora Console.
        if(TextUtils.isEmpty(APP_KEY)) {
            Toast.makeText(MainActivity.this, "You should set your AppKey first!", Toast.LENGTH_SHORT).show();
            return;
        }
        // Sets your App Key to options.
        options.setAppKey(APP_KEY);
        // Initializes the Agora Chat SDK.
        ChatClient.getInstance().init(this, options);
        // Makes the Agora Chat SDK debuggable.
        ChatClient.getInstance().setDebugMode(true);
        // Shows the current user.
        ((TextView)findViewById(R.id.tv_username)).setText("Current user: "+USERNAME);
    }
    private void initListener() {
        // Adds message event callbacks.
        ChatClient.getInstance().chatManager().addMessageListener(messages -> {
            for(ChatMessage message : messages) {
                StringBuilder builder = new StringBuilder();
                builder.append("Receive a ").append(message.getType().name())
                        .append(" message from: ").append(message.getFrom());
                if(message.getType() == ChatMessage.Type.TXT) {
                    builder.append(" content:")
                            .append(((TextMessageBody)message.getBody()).getMessage());
                }
                showLog(builder.toString(), false);
            }
        });
        // Adds connection event callbacks.
        ChatClient.getInstance().addConnectionListener(new ConnectionListener() {
            @Override
            public void onConnected() {
                showLog("onConnected",false);
            }

            @Override
            public void onDisconnected(int error) {
                showLog("onDisconnected: "+error,false);
            }

            @Override
            public void onLogout(int errorCode) {
                showLog("User needs to log out: "+errorCode, false);
                ChatClient.getInstance().logout(false, null);
            }
            // This callback occurs when the token expires. When the callback is triggered, the app client must get a new token from the app server and logs in to the app again.
            @Override
            public void onTokenExpired() {
                showLog("ConnectionListener onTokenExpired", true);
            }
            // This callback occurs when the token is about to expire.
            @Override
            public void onTokenWillExpire() {
                showLog("ConnectionListener onTokenWillExpire", true);
            }
        });
    }
    // Logs in with a token.
    public void signInWithToken(View view) {
        loginToAgora();
    }

    private void loginToAgora() {
        if(TextUtils.isEmpty(USERNAME) || TextUtils.isEmpty(TOKEN)) {
            showLog("Username or token is empty!", true);
            return;
        }
        ChatClient.getInstance().loginWithAgoraToken(USERNAME, TOKEN, new CallBack() {
            @Override
            public void onSuccess() {
                showLog("Sign in success!", true);
            }

            @Override
            public void onError(int code, String error) {
                showLog(error, true);
            }
        });
    }

    // Logs out.
    public void signOut(View view) {
        if(ChatClient.getInstance().isLoggedInBefore()) {
            ChatClient.getInstance().logout(true, new CallBack() {
                @Override
                public void onSuccess() {
                    showLog("Sign out success!", true);
                }

                @Override
                public void onError(int code, String error) {
                    showLog(error, true);
                }
            });
        }else {
            showLog("You were not logged in", false);
        }
    }
    // Sends the first message.
    public void sendFirstMessage(View view) {
        String toSendName = ((EditText)findViewById(R.id.et_to_chat_name)).getText().toString().trim();
        String content = ((EditText)findViewById(R.id.et_msg_content)).getText().toString().trim();
        // Creates a text message.
        ChatMessage message = ChatMessage.createTextSendMessage(content, toSendName);
        // Sets the message callback before sending the message.
        message.setMessageStatusCallback(new CallBack() {
            @Override
            public void onSuccess() {
                showLog("Send message success!", true);
            }

            @Override
            public void onError(int code, String error) {
                showLog(error, true);
            }
        });

        // Sends the message.
        ChatClient.getInstance().chatManager().sendMessage(message);
    }
    // Shows logs.
    private void showLog(String content, boolean showToast) {
        if(TextUtils.isEmpty(content)) {
            return;
        }
        runOnUiThread(()-> {
            if(showToast) {
                Toast.makeText(this, content, Toast.LENGTH_SHORT).show();
            }
            TextView tv_log = findViewById(R.id.tv_log);
            String preContent = tv_log.getText().toString().trim();
            StringBuilder builder = new StringBuilder();
            builder.append(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()).format(new Date()))
                    .append(" ").append(content).append("\n").append(preContent);
            tv_log.setText(builder);
        });
    }


}