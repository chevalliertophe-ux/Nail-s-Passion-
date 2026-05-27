import 'package:flutter/material.dart';

class ContactPage extends StatelessWidget {
  const ContactPage({super.key});

  Widget card(
    IconData icon,
    String title,
    String subtitle,
  ) {
    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 12,
      ),

      padding: const EdgeInsets.all(25),

      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(25),

        boxShadow: [
          BoxShadow(
            color: Colors.pinkAccent.withOpacity(0.3),
            blurRadius: 20,
          ),
        ],
      ),

      child: Row(
        children: [

          Icon(
            icon,
            color: Colors.pinkAccent,
            size: 35,
          ),

          const SizedBox(width: 20),

          Column(
            crossAxisAlignment:
                CrossAxisAlignment.start,

            children: [

              Text(
                title,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 5),

              Text(
                subtitle,
                style: const TextStyle(
                  color: Colors.white70,
                  fontSize: 18,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text("Contact"),
      ),

      body: ListView(
        children: [

          const SizedBox(height: 30),

          card(
            Icons.camera_alt,
            "Instagram",
            "@nails.passion",
          ),

          card(
            Icons.phone,
            "Téléphone",
            "07 00 00 00 00",
          ),

          card(
            Icons.chat,
            "WhatsApp",
            "Disponible",
          ),

          card(
            Icons.location_on,
            "Adresse",
            "Salon Premium",
          ),
        ],
      ),
    );
  }
}
