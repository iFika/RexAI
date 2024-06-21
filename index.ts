

import {recognize} from './lib/recognition-voice'
import { Speeching } from './lib/speech'
import { SmartThink } from './lib/smart-ai'
const audio = require("win-audio").mic
import {QLabel, QMainWindow, FlexLayout, QWidget, QPushButton, QCheckBox} from '@nodegui/nodegui'
async function main_gui()
{
  const win = new QMainWindow();
win.setWindowTitle('RexAI');
win.resize(400, 300);

// Buat widget utama
const centralWidget = new QWidget();
centralWidget.setObjectName('centralWidget');

// Buat layout Flexbox
const layout = new FlexLayout();
centralWidget.setLayout(layout);

// Buat label untuk judul
const titleLabel = new QLabel();
titleLabel.setText('RexAI - AI Built in Internet by iFika');
titleLabel.setObjectName('titleLabel');

// Buat tombol
const button = new QPushButton();
button.setText('REX-AI');
button.setObjectName('button');
button.hide();


const greenButton = new QPushButton();
greenButton.setText(`Talking...`);
greenButton.setObjectName('greenbutton');
greenButton.hide()

const MuteButton = new QCheckBox();
MuteButton.setText('Mute (CHANGE EVENT IN 10 SECONDS)');
MuteButton.setObjectName('mutebutton');
// Tambahkan label dan tombol ke layout
layout.addWidget(titleLabel);
layout.addWidget(button);
layout.addWidget(greenButton);
layout.addWidget(MuteButton)
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
Looping_Activity()
async function Looping_Activity() {
greenButton.show()
button.hide()
greenButton.setText(`Listening..`)
recognize.start(MuteButton.isChecked());
recognize.on('silence', (data) => {
  greenButton.hide()
  button.show()
  button.setText(data)
})
recognize.on('errorServer', (data) => {
  greenButton.hide()
  button.show()
  button.setText("Connector to RexAI Server is failed! Attempting...")
  recognize.Stop()
  Looping_Activity()
})
recognize.on('talking', (data) => {
  button.hide()
  greenButton.show()
  greenButton.setText(data)
})
recognize.on('silencefinal', (data) => {
  greenButton.hide()
  button.show()
  button.setText(data)
})
recognize.on('transcript', async(data) => {
  greenButton.show()
  button.hide()
  greenButton.setText(`Thinking...`)
  if(data == null) {
greenButton.hide()
button.show()
button.setText(`Not Speeching, Recognition...`)
recognize.Stop()
Looping_Activity()
  }
  else {
  let think = await SmartThink(data)
  greenButton.setText(`RexAI Speeching...`)
  let isFinishSpeech = await Speeching(think.toString())
  if(isFinishSpeech) {
    recognize.Stop()
    Looping_Activity()
  }
  }
})
}
}
main_gui()