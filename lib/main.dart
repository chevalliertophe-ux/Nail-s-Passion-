import 'package:flutter/material.dart';

void main() {
  runApp(const NailsPassionApp());
}

class NailsPassionApp extends StatelessWidget {
  const NailsPassionApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.black,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      backgroundColor: Colors.black,

      body: SafeArea(

        child: SingleChildScrollView(

          child: Column(

            children: [

              const SizedBox(height: 20),

              const Icon(
                Icons.workspace_premium,
                color: Colors.amber,
                size: 90,
              ),

              const SizedBox(height: 10),

              const Text(
                "Nail's Passion",
                style: TextStyle(
                  color: Colors.pinkAccent,
                  fontSize: 38,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 10),

              const Text(
                "La beauté est notre passion 💖",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                ),
              ),

              const SizedBox(height: 30),

              Padding(
                padding: const EdgeInsets.all(15),

                child: Row(
                  mainAxisAlignment:
                      MainAxisAlignment.spaceEvenly,

                  children: [

                    premiumButton(
                      Icons.brush,
                      "Pose Gel",
                    ),

                    premiumButton(
                      Icons.auto_awesome,
                      "Nail Art",
                    ),

                    premiumButton(
                      Icons.favorite,
                      "Manucure",
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              premiumCard(
                "Pose Gel",
                "25€",
              ),

              premiumCard(
                "Nail Art",
                "15€",
              ),

              premiumCard(
                "Remplissage",
                "20€",
              ),

              premiumCard(
                "Manucure",
                "15€",
              ),

              const SizedBox(height: 30),
            ],
          ),
        ),
      ),

      bottomNavigationBar: BottomNavigationBar(

        backgroundColor: Colors.black,

        selectedItemColor:
            Colors.pinkAccent,

        unselectedItemColor:
            Colors.white,

        items: const [

          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: "Accueil",
          ),

          BottomNavigationBarItem(
            icon: Icon(Icons.photo),
            label: "Galerie",
          ),

          BottomNavigationBarItem(
            icon: Icon(Icons.star),
            label: "Prestations",
          ),

          BottomNavigationBarItem(
            icon: Icon(Icons.phone),
            label: "Contact",
          ),

          BottomNavigationBarItem(
            icon: Icon(Icons.lock),
            label: "Admin",
          ),
        ],
      ),
    );
  }

  Widget premiumButton(
    IconData icon,
    String text,
  ) {

    return Column(

      children: [

        Container(

          padding: const EdgeInsets.all(20),

          decoration: BoxDecoration(

            color: Colors.pinkAccent,

            shape: BoxShape.circle,

            boxShadow: const [

              BoxShadow(
                color: Colors.pinkAccent,
                blurRadius: 25,
              ),
            ],
          ),

          child: Icon(
            icon,
            color: Colors.white,
            size: 35,
          ),
        ),

        const SizedBox(height: 10),

        Text(
          text,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 22,
          ),
        ),
      ],
    );
  }

  Widget premiumCard(
    String title,
    String price,
  ) {

    return Container(

      margin: const EdgeInsets.all(15),

      padding: const EdgeInsets.all(25),

      decoration: BoxDecoration(

        borderRadius:
            BorderRadius.circular(30),

        gradient: const LinearGradient(

          colors: [
            Colors.pinkAccent,
            Colors.black,
          ],
        ),

        boxShadow: const [

          BoxShadow(
            color: Colors.pinkAccent,
            blurRadius: 25,
          ),
        ],
      ),

      child: Row(

        mainAxisAlignment:
            MainAxisAlignment.spaceBetween,

        children: [

          Text(

            title,

            style: const TextStyle(
              color: Colors.white,
              fontSize: 28,
            ),
          ),

          Text(

            price,

            style: const TextStyle(
              color: Colors.pinkAccent,
              fontSize: 26,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
