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
      title: "Nail's Passion",
      theme: ThemeData.dark(),
      home: const MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {

  int currentIndex = 0;

  final pages = [
    const HomePage(),
    const GalleryPage(),
    const PrestationsPage(),
    const ContactPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[currentIndex],

      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentIndex,
        backgroundColor: const Color(0xFF120010),
        selectedItemColor: Colors.pink,
        unselectedItemColor: Colors.white70,

        onTap: (index) {
          setState(() {
            currentIndex = index;
          });
        },

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
        ],
      ),
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
        backgroundColor: Colors.pink,
        centerTitle: true,
        title: const Text("Nail's Passion"),
      ),

      body: SingleChildScrollView(
        child: Column(
          children: [

            Container(
              height: 420,
              width: double.infinity,

              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.black,
                    Color(0xFF14000A),
                    Colors.black,
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),

              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [

                  Container(
                    width: 150,
                    height: 150,

                    decoration: BoxDecoration(
                      shape: BoxShape.circle,

                      border: Border.all(
                        color: Colors.pink,
                        width: 3,
                      ),

                      boxShadow: [
                        BoxShadow(
                          color: Colors.pinkAccent.withOpacity(0.7),
                          blurRadius: 40,
                          spreadRadius: 10,
                        ),
                      ],
                    ),

                    child: const Icon(
                      Icons.auto_awesome,
                      color: Colors.pink,
                      size: 80,
                    ),
                  ),

                  const SizedBox(height: 30),

                  const Text(
                    "Nail's Passion",
                    style: TextStyle(
                      fontSize: 42,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),

                  const SizedBox(height: 10),

                  const Text(
                    "Beauté • Élégance • Onglerie Premium",
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.pinkAccent,
                    ),
                  ),

                  const SizedBox(height: 35),

                  Container(
                    margin: const EdgeInsets.symmetric(horizontal: 40),

                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.pink,
                        minimumSize: const Size(double.infinity, 60),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30),
                        ),
                      ),

                      onPressed: () {},

                      child: const Text(
                        "Réserver maintenant",
                        style: TextStyle(
                          fontSize: 20,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 30),

            const Text(
              "Nos prestations",
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),

            const SizedBox(height: 20),

            ServiceCard("Pose Gel", "25€"),
            ServiceCard("Nail Art", "15€"),
            ServiceCard("Remplissage", "20€"),
            ServiceCard("Manucure", "15€"),

            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}

class GalleryPage extends StatelessWidget {
  const GalleryPage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.pink,
        title: const Text("Galerie"),
      ),

      body: GridView.count(
        crossAxisCount: 2,
        padding: const EdgeInsets.all(15),
        crossAxisSpacing: 15,
        mainAxisSpacing: 15,

        children: List.generate(
          6,
          (index) => Container(
            decoration: BoxDecoration(
              color: const Color(0xFF1A1A1A),
              borderRadius: BorderRadius.circular(20),
            ),

            child: const Icon(
              Icons.photo,
              color: Colors.pink,
              size: 50,
            ),
          ),
        ),
      ),
    );
  }
}

class PrestationsPage extends StatelessWidget {
  const PrestationsPage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.pink,
        title: const Text("Prestations"),
      ),

      body: ListView(
        padding: const EdgeInsets.all(20),

        children: const [
          ServiceCard("Pose Gel", "25€"),
          ServiceCard("Nail Art", "15€"),
          ServiceCard("Remplissage", "20€"),
          ServiceCard("Manucure", "15€"),
          ServiceCard("Gainage", "20€"),
          ServiceCard("Dépose Gel", "10€"),
        ],
      ),
    );
  }
}

class ContactPage extends StatelessWidget {
  const ContactPage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.pink,
        title: const Text("Contact"),
      ),

      body: Padding(
        padding: const EdgeInsets.all(20),

        child: Column(
          children: [

            ContactCard(
              Icons.phone,
              "Téléphone",
              "06 12 34 56 78",
            ),

            ContactCard(
              Icons.location_on,
              "Adresse",
              "Paris, France",
            ),

            ContactCard(
              Icons.access_time,
              "Horaires",
              "Lun - Sam : 9h / 19h",
            ),
          ],
        ),
      ),
    );
  }
}

class ServiceCard extends StatelessWidget {

  final String title;
  final String price;

  const ServiceCard(
    this.title,
    this.price, {
    super.key,
  });

  @override
  Widget build(BuildContext context) {

    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 10,
      ),

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(
        color: const Color(0xFF151515),
        borderRadius: BorderRadius.circular(25),
      ),

      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 22,
            ),
          ),

          Text(
            price,
            style: const TextStyle(
              color: Colors.pink,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class ContactCard extends StatelessWidget {

  final IconData icon;
  final String title;
  final String subtitle;

  const ContactCard(
    this.icon,
    this.title,
    this.subtitle, {
    super.key,
  });

  @override
  Widget build(BuildContext context) {

    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(
        color: const Color(0xFF151515),
        borderRadius: BorderRadius.circular(20),
      ),

      child: Row(
        children: [

          Icon(
            icon,
            color: Colors.pink,
            size: 35,
          ),

          const SizedBox(width: 20),

          Column(
            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text(
                title,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 5),

              Text(
                subtitle,
                style: const TextStyle(
                  color: Colors.white70,
                  fontSize: 16,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}


