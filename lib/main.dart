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

  final pages = const [
    HomePage(),
    GalleryPage(),
    PrestationsPage(),
    ContactPage(),
    AdminPage(),
  ];

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: pages[currentIndex],

      bottomNavigationBar: BottomNavigationBar(

        backgroundColor: Colors.black,

        selectedItemColor: Colors.pinkAccent,

        unselectedItemColor: Colors.white54,

        type: BottomNavigationBarType.fixed,

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
            icon: Icon(Icons.photo_library),
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

    return Scaffold(

      backgroundColor: Colors.black,

      body: SafeArea(

        child: SingleChildScrollView(

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
                  fontSize: 38,
                  fontWeight: FontWeight.bold,
                  color: Colors.pinkAccent,
                ),
              ),

              const SizedBox(height: 10),

              const Text(

                "La beauté est notre passion 💖",

                style: TextStyle(
                  color: Colors.white70,
                  fontSize: 20,
                ),
              ),

              const SizedBox(height: 40),

              Row(

                mainAxisAlignment:
                    MainAxisAlignment.spaceEvenly,

                children: const [

                  FeatureItem(
                    Icons.brush,
                    "Pose Gel",
                  ),

                  FeatureItem(
                    Icons.auto_awesome,
                    "Nail Art",
                  ),

                  FeatureItem(
                    Icons.favorite,
                    "Manucure",
                  ),
                ],
              ),

              const SizedBox(height: 50),

              const ServiceCard(
                "Pose Gel",
                "25€",
              ),

              const ServiceCard(
                "Nail Art",
                "15€",
              ),

              const ServiceCard(
                "Remplissage",
                "20€",
              ),

              const ServiceCard(
                "Manucure",
                "15€",
              ),

              const SizedBox(height: 30),
            ],
          ),
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
        backgroundColor: Colors.pinkAccent,
        title: const Text("Galerie"),
      ),

      body: GridView.builder(

        padding: const EdgeInsets.all(20),

        itemCount: 8,

        gridDelegate:
            const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 15,
          mainAxisSpacing: 15,
        ),

        itemBuilder: (_, index) {

          return Container(

            decoration: BoxDecoration(

              borderRadius:
                  BorderRadius.circular(20),

              gradient: const LinearGradient(
                colors: [
                  Colors.pinkAccent,
                  Colors.black,
                ],
              ),
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

class PrestationsPage extends StatelessWidget {
  const PrestationsPage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.pinkAccent,
        title: const Text("Prestations"),
      ),

      body: ListView(

        padding: const EdgeInsets.all(20),

        children: const [

          ServiceCard("Pose Gel", "25€"),
          ServiceCard("Nail Art", "15€"),
          ServiceCard("Remplissage", "20€"),
          ServiceCard("Manucure", "15€"),
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
        backgroundColor: Colors.pinkAccent,
        title: const Text("Contact"),
      ),

      body: ListView(

        padding: const EdgeInsets.all(20),

        children: const [

          ContactCard(
            Icons.phone,
            "06 12 34 56 78",
          ),

          ContactCard(
            Icons.message,
            "WhatsApp",
          ),

          ContactCard(
            Icons.camera_alt,
            "@nailspassion",
          ),

          ContactCard(
            Icons.location_on,
            "Paris",
          ),
        ],
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

      appBar: AppBar(
        backgroundColor: Colors.pinkAccent,
        title: const Text("Admin"),
      ),

      body: Center(

        child: Container(

          padding: const EdgeInsets.all(30),

          margin: const EdgeInsets.all(30),

          decoration: BoxDecoration(

            color: Colors.white10,

            borderRadius:
                BorderRadius.circular(25),
          ),

          child: const Column(

            mainAxisSize: MainAxisSize.min,

            children: [

              Icon(
                Icons.lock,
                color: Colors.pinkAccent,
                size: 90,
              ),

              SizedBox(height: 20),

              Text(

                "Code Admin : 0712",

                style: TextStyle(
                  fontSize: 28,
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FeatureItem extends StatelessWidget {

  final IconData icon;
  final String title;

  const FeatureItem(
    this.icon,
    this.title, {
      super.key,
    });

  @override
  Widget build(BuildContext context) {

    return Column(

      children: [

        CircleAvatar(

          radius: 35,

          backgroundColor: Colors.pinkAccent,

          child: Icon(
            icon,
            size: 35,
            color: Colors.white,
          ),
        ),

        const SizedBox(height: 10),

        Text(
          title,

          style: const TextStyle(
            fontSize: 18,
            color: Colors.white,
          ),
        ),
      ],
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

      margin: const EdgeInsets.only(bottom: 20),

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: Colors.white10,

        borderRadius:
            BorderRadius.circular(25),

        boxShadow: const [

          BoxShadow(
            color: Colors.pinkAccent,
            blurRadius: 10,
          )
        ],
      ),

      child: Row(

        mainAxisAlignment:
            MainAxisAlignment.spaceBetween,

        children: [

          Text(
            title,

            style: const TextStyle(
              fontSize: 22,
              color: Colors.white,
            ),
          ),

          Text(
            price,

            style: const TextStyle(
              fontSize: 24,
              color: Colors.pinkAccent,
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
  final String text;

  const ContactCard(
    this.icon,
    this.text, {
      super.key,
    });

  @override
  Widget build(BuildContext context) {

    return Container(

      margin: const EdgeInsets.only(bottom: 20),

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: Colors.white10,

        borderRadius:
            BorderRadius.circular(25),
      ),

      child: Row(

        children: [

          Icon(
            icon,
            color: Colors.pinkAccent,
            size: 35,
          ),

          const SizedBox(width: 20),

          Text(
            text,

            style: const TextStyle(
              fontSize: 18,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}
