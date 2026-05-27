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
    const ServicesPage(),
    const ContactPage(),
    const AdminPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: pages[currentIndex],

      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black,
        selectedItemColor: Colors.pinkAccent,
        unselectedItemColor: Colors.white54,
        currentIndex: currentIndex,

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
            icon: Icon(Icons.image),
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
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        child: Container(
          color: Colors.black,
          padding: const EdgeInsets.all(20),

          child: Column(
            children: [

              const SizedBox(height: 20),

              Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.pinkAccent.withOpacity(0.8),
                      blurRadius: 40,
                      spreadRadius: 10,
                    ),
                  ],
                ),

                child: const CircleAvatar(
                  radius: 60,
                  backgroundColor: Colors.black,
                  child: Icon(
                    Icons.workspace_premium,
                    color: Colors.amber,
                    size: 80,
                  ),
                ),
              ),

              const SizedBox(height: 20),

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
                  color: Colors.white70,
                  fontSize: 22,
                ),
              ),

              const SizedBox(height: 40),

              const Text(
                "La beauté est notre passion 💖",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),

              const SizedBox(height: 40),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [

                  premiumButton(context, Icons.calendar_month, "Réserver"),

                  premiumButton(Icons.phone, "Contact"),
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

              serviceCard("Pose Gel", "25€"),
              serviceCard("Nail Art", "15€"),
              serviceCard("Remplissage", "20€"),
              serviceCard("Manucure", "15€"),
            ],
          ),
        ),
      ),
    );
  }

  Widget premiumButton(BuildContext context, IconData icon, String text) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(40),
        boxShadow: [
          BoxShadow(
            color: Colors.pinkAccent.withOpacity(0.7),
            blurRadius: 25,
            spreadRadius: 5,
          ),
        ],
      ),

      child: ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.pinkAccent,
          padding: const EdgeInsets.symmetric(
            horizontal: 30,
            vertical: 18,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(40),
          ),
        ),

        onPressed: () { ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("$text bientôt disponible"), backgroundColor: Colors.pinkAccent)); },

        icon: Icon(icon),
        label: Text(
          text,
          style: const TextStyle(fontSize: 22),
        ),
      ),
    );
  }

  Widget serviceCard(String title, String price) {
    return Container(
      margin: const EdgeInsets.only(bottom: 25),

      padding: const EdgeInsets.all(25),

      decoration: BoxDecoration(
        color: const Color(0xFF111111),

        borderRadius: BorderRadius.circular(30),

        boxShadow: [
          BoxShadow(
            color: Colors.pinkAccent.withOpacity(0.5),
            blurRadius: 25,
            spreadRadius: 2,
          ),
        ],
      ),

      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(
            children: [

              const Icon(
                Icons.brush,
                color: Colors.pinkAccent,
                size: 35,
              ),

              const SizedBox(width: 15),

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

class GalleryPage extends StatelessWidget {
  const GalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,

      body: GridView.builder(
        padding: const EdgeInsets.all(20),

        gridDelegate:
            const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 15,
          mainAxisSpacing: 15,
        ),

        itemCount: 8,

        itemBuilder: (context, index) {
          return Container(
            decoration: BoxDecoration(
              color: Colors.pinkAccent.withOpacity(0.2),

              borderRadius: BorderRadius.circular(25),

              boxShadow: [
                BoxShadow(
                  color: Colors.pinkAccent.withOpacity(0.4),
                  blurRadius: 20,
                ),
              ],
            ),

            child: const Icon(
              Icons.image,
              color: Colors.white,
              size: 50,
            ),
          );
        },
      ),
    );
  }
}

class ServicesPage extends StatelessWidget {
  const ServicesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,

      body: const Center(
        child: Text(
          "Prestations Premium",
          style: TextStyle(
            color: Colors.pinkAccent,
            fontSize: 35,
            fontWeight: FontWeight.bold,
          ),
        ),
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

      body: const Center(
        child: Text(
          "Contact Premium",
          style: TextStyle(
            color: Colors.pinkAccent,
            fontSize: 35,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}

class AdminPage extends StatelessWidget {
  const AdminPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,

      body: const Center(
        child: Text(
          "Admin Premium",
          style: TextStyle(
            color: Colors.pinkAccent,
            fontSize: 35,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
