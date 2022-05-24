# KNX/IP Interface

Should work with all standard conform KNX/IP Gateways. Tested with

- [MDT SCN-IP000.03](https://www.mdt.de/produkte/produktdetail.html?tx_mdtproducts_detail%5Baction%5D=detail&tx_mdtproducts_detail%5Bcontroller%5D=Productseries&tx_mdtproducts_detail%5Bseries%5D=60&cHash=127caad8851b07bc2d00c6643c339fc5)
- *If you tested it with another Gateway [Open an Issue](https://github.com/bitfocus/companion-module-knx-ip/issues/new)*

## Features

- Transmit Telegram on Button-Press or Button-Toggle
- Receive Telegram to control Button-Feedback
- Range-Comparison for numeric Feedback (Button ist "on" when Value is between min & max Values)
- Transmit one of two Telegrams depending on Feedback-State (ie. On/Off Telegram depending on State)
- Works with lots of common Data-Types (see below) for Transmit and Feedback

## Data-Types

The following Data-Types with lots of subtypes are supported:

- DPT1: 1-bit
- DPT2: 1-bit with Priority
- DPT3: 4-bit Dimming/Blinds control
- DPT4: Character
- DPT5: 8-bit unsigned
- DPT6: 8-bit signed
- DPT7: 16-bit unsigned
- DPT8: 16-bit signed
- DPT9: 16-bit float
- DPT10: Time
- DPT11: Date
- DPT12: 32-bit unsigned
- DPT13: 32-bit signed
- DPT14: 32-bit float
- DPT16: Text (Up to 14 Characters)
- DPT17: Scene Number
- DPT18: Scene Control
- DPT19: Date & Time
- DPT232: RGB Color
- *If you need another Data-Type, [Open an Issue](https://github.com/bitfocus/companion-module-knx-ip/issues/new)*
