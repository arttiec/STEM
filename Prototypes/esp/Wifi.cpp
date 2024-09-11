#include "Wifi.h"

Wifi::Wifi() {};

void Wifi::start() {
  WiFi.mode(WIFI_STA);

  wifi.addAP("put-your-nw-name", "put-your-nw-ssid");
  
  Serial.print("Conectando");

  while (wifi.run() != WL_CONNECTED) {
    Serial.print(".");
  }
  Serial.println();
  
  Serial.print("Conectado | Endereço IP:");
  Serial.println(WiFi.localIP());
};

Wifi::~Wifi() {};
