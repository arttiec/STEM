#include "Wifi.h"

Wifi::Wifi() {};

void Wifi::start() {
  WiFi.mode(WIFI_STA);

  wifi.addAP("Margareth2G", "Maga3008");
  wifi.addAP("EVENTOS", "eventos2020!");
  wifi.addAP("songbird", "epvv8783");
  wifi.addAP("STEMLABNET", "1n0v@t3ch.5t3m@#!");
  wifi.addAP("STEMLABNET_LARANJA", "stemlabnet");
  wifi.addAP("STEMLABNET_ROXO", "stemlabnet");
  
  Serial.print("Conectando");

  while (wifi.run() != WL_CONNECTED) {
    Serial.print(".");
  }
  Serial.println();
  
  Serial.print("Conectado | Endereço IP:");
  Serial.println(WiFi.localIP());
};

Wifi::~Wifi() {};
