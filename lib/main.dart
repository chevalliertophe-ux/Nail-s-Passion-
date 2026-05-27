import 'package:flutter/material.dart';

void main() {
  runApp(const NailsApp());
}

class NailsApp extends StatelessWidget {
  const NailsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
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

      appBar: AppBar(
        backgroundColor: Colors.pinkAccent,
        title: const Text("Nail's Passion"),
      ),

      body: SingleChildScrollView(

        child: Column(

          children: [

            const SizedBox(height: 30),

            const Icon(
              Icons.workspace_premium,
              color: Colors.amber,
              size: 100,
            ),

            const SizedBox(height: 20),

            const Text(
              "Nail's Passion",
              style: TextStyle(
                color: Colors.pinkAccent,
                fontSize: 40,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            const Text(
              "La beauté est notre passion 💖",
              style: TextStyle(
                color: Colors.white,
                fontSize: 22,
              ),
            ),

            const SizedBox(height: 40),

            Row(
              mainAxisAlignment:
                  MainAxisAlignment.spaceEvenly,

              children: [

                serviceButton(
                  Icons.brush,
                  "Pose Gel",
                ),

                serviceButton(
                  Icons.auto_awesome,
                  "Nail Art",
                ),

                serviceButton(
                  Icons.favorite,
                  "Manucure",
                ),
              ],
            ),

            const SizedBox(height: 40),

            prestationCard(
              "Pose Gel",
              "25€",
            ),

            prestationCard(
              "Nail Art",
              "15€",
            ),

            prestationCard(
              "Remplissage",
              "20€",
            ),

            prestationCard(
              "Manucure",
              "15€",
            ),

            const SizedBox(height: 30),
          ],
        ),
      ),

      bottomNavigationBar: BottomNavigationBar(

        backgroundColor: Colors.black,

        selectedItemColor: Colors.pinkAccent,

        unselectedItemColor: Colors.white,

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

  Widget prestationCard(
    String title,
    String price,
  ) {

    return Container(

      margin: const EdgeInsets.all(15),

      padding: const EdgeInsets.all(25),

      decoration: BoxDecoration(

        color: Colors.pinkAccent,

        borderRadius:
            BorderRadius.circular(30),

        boxShadow: const [

          BoxShadow(
            color: Colors.pinkAccent,
            blurRadius: 20,
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
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget serviceButton(
    IconData icon,
    String text,
  ) {

    return Column(

      children: [

        CircleAvatar(

          radius: 45,

          backgroundColor:
              Colors.pinkAccent,

          child: Icon(
            icon,
            color: Colors.white,
            size: 40,
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
}
