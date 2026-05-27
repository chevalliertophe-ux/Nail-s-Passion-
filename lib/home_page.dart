import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,

      body: SingleChildScrollView(
        child: Column(
          children: [

            const SizedBox(height: 50),

            const CircleAvatar(
              radius: 60,
              backgroundColor: Colors.pinkAccent,
              child: Icon(
                Icons.star,
                size: 60,
                color: Colors.white,
              ),
            ),

            const SizedBox(height: 25),

            const Text(
              "Nail's Passion",
              style: TextStyle(
                color: Colors.white,
                fontSize: 42,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            const Text(
              "Beauté • Élégance • Premium",
              style: TextStyle(
                color: Colors.white54,
                fontSize: 18,
              ),
            ),

            const SizedBox(height: 40),

            const Text(
              "La beauté est ma passion 💖",
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 34,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 40),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [

                premiumButton(
                  Icons.calendar_month,
                  "Réserver",
                ),

                premiumButton(
                  Icons.phone,
                  "Contact",
                ),
              ],
            ),

            const SizedBox(height: 50),

            const Text(
              "Nos Prestations",
              style: TextStyle(
                color: Colors.white,
                fontSize: 34,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 30),

            serviceCard(Icons.brush, "Pose Gel", "25€"),
            serviceCard(Icons.auto_awesome, "Nail Art", "15€"),
            serviceCard(Icons.favorite, "Remplissage", "20€"),
            serviceCard(Icons.spa, "Manucure", "15€"),

            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  static Widget premiumButton(
    IconData icon,
    String text,
  ) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 35,
        vertical: 18,
      ),
      decoration: BoxDecoration(
        color: Colors.pinkAccent,
        borderRadius: BorderRadius.circular(40),
        boxShadow: [
          BoxShadow(
            color: Colors.pinkAccent.withOpacity(0.7),
            blurRadius: 25,
          ),
        ],
      ),
      child: Row(
        children: [
          Icon(icon, color: Colors.white),
          const SizedBox(width: 10),
          Text(
            text,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 22,
            ),
          ),
        ],
      ),
    );
  }

  static Widget serviceCard(
    IconData icon,
    String title,
    String price,
  ) {
    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 12,
      ),
      padding: const EdgeInsets.all(25),

      decoration: BoxDecoration(
        color: const Color(0xFF111111),
        borderRadius: BorderRadius.circular(30),

        boxShadow: [
          BoxShadow(
            color: Colors.pinkAccent.withOpacity(0.3),
            blurRadius: 25,
          ),
        ],
      ),

      child: Row(
        mainAxisAlignment:
            MainAxisAlignment.spaceBetween,

        children: [

          Row(
            children: [

              Icon(
                icon,
                color: Colors.pinkAccent,
                size: 35,
              ),

              const SizedBox(width: 20),

              Text(
                title,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                ),
              ),
            ],
          ),

          Text(
            price,
            style: const TextStyle(
              color: Colors.pinkAccent,
              fontSize: 30,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
