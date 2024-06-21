"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recognition_voice_1 = require("./lib/recognition-voice");
const speech_1 = require("./lib/speech");
const smart_ai_1 = require("./lib/smart-ai");
const audio = require("win-audio").mic;
const nodegui_1 = require("@nodegui/nodegui");
async function main_gui() {
    const win = new nodegui_1.QMainWindow();
    win.setWindowTitle('RexAI');
    win.resize(400, 300);
    // Buat widget utama
    const centralWidget = new nodegui_1.QWidget();
    centralWidget.setObjectName('centralWidget');
    // Buat layout Flexbox
    const layout = new nodegui_1.FlexLayout();
    centralWidget.setLayout(layout);
    // Buat label untuk judul
    const titleLabel = new nodegui_1.QLabel();
    titleLabel.setText('RexAI - AI Built in Internet by iFika');
    titleLabel.setObjectName('titleLabel');
    // Buat tombol
    const button = new nodegui_1.QPushButton();
    button.setText('REX-AI');
    button.setObjectName('button');
    button.hide();
    const greenButton = new nodegui_1.QPushButton();
    greenButton.setText(`Talking...`);
    greenButton.setObjectName('greenbutton');
    greenButton.hide();
    const MuteButton = new nodegui_1.QCheckBox();
    MuteButton.setText('Mute (CHANGE EVENT IN 10 SECONDS)');
    MuteButton.setObjectName('mutebutton');
    // Tambahkan label dan tombol ke layout
    layout.addWidget(titleLabel);
    layout.addWidget(button);
    layout.addWidget(greenButton);
    layout.addWidget(MuteButton);
    // Terapkan style
    centralWidget.setStyleSheet(`
  #centralWidget {
    background-color: #f0f0f0; /* Warna latar */
  }

  #titleLabel {
    font-size: 24px;
    color: #333; /* Warna teks */
    margin-bottom: 20px;
  }

  #button {
    background-color: #FF0000; /* Warna latar belakang tombol */
    color: #007bff; /* Warna teks tombol */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
  }
  
  #greenbutton {
    background-color: #00FF00; /* Warna latar belakang tombol */
    color: #00FFFF; /* Warna teks tombol */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
  }
    #mutebutton {
    background-color: #FF0000; /* Warna latar belakang tombol */
    color: #007bff; /* Warna teks tombol */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
  }
`);
    // Atur widget utama sebagai widget pusat
    win.setCentralWidget(centralWidget);
    win.show();
    Looping_Activity();
    async function Looping_Activity() {
        greenButton.show();
        button.hide();
        greenButton.setText(`Listening..`);
        recognition_voice_1.recognize.start(MuteButton.isChecked());
        recognition_voice_1.recognize.on('silence', (data) => {
            greenButton.hide();
            button.show();
            button.setText(data);
        });
        recognition_voice_1.recognize.on('errorServer', (data) => {
            greenButton.hide();
            button.show();
            button.setText("Connector to RexAI Server is failed! Attempting...");
            recognition_voice_1.recognize.Stop();
            Looping_Activity();
        });
        recognition_voice_1.recognize.on('talking', (data) => {
            button.hide();
            greenButton.show();
            greenButton.setText(data);
        });
        recognition_voice_1.recognize.on('silencefinal', (data) => {
            greenButton.hide();
            button.show();
            button.setText(data);
        });
        recognition_voice_1.recognize.on('transcript', async (data) => {
            greenButton.show();
            button.hide();
            greenButton.setText(`Thinking...`);
            if (data == null) {
                greenButton.hide();
                button.show();
                button.setText(`Not Speeching, Recognition...`);
                recognition_voice_1.recognize.Stop();
                Looping_Activity();
            }
            else {
                let think = await (0, smart_ai_1.SmartThink)(data);
                greenButton.setText(`RexAI Speeching...`);
                let isFinishSpeech = await (0, speech_1.Speeching)(think.toString());
                if (isFinishSpeech) {
                    recognition_voice_1.recognize.Stop();
                    Looping_Activity();
                }
            }
        });
    }
}
main_gui();
