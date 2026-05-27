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
    ServicesPage(),
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

    return Scaffold(

      backgroundColor: Colors.black,

      body: Container(

        decoration: const BoxDecoration(

          gradient: LinearGradient(

            colors: [
              Colors.black,
              Color(0xFF1A0010),
              Colors.black,
            ],

            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),

        child: SafeArea(

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
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: Colors.pinkAccent,
                  ),
                ),

                const SizedBox(height: 15),

                const Text(

                  "La beauté est notre passion 💖",

                  style: TextStyle(
                    fontSize: 22,
                    color: Colors.white,
                  ),
                ),

                const SizedBox(height: 40),

                Row(

                  mainAxisAlignment:
                      MainAxisAlignment.spaceEvenly,

                  children: const [

                    PremiumButton(
                      Icons.brush,
                      "Pose Gel",
                    ),

                    PremiumButton(
                      Icons.auto_awesome,
                      "Nail Art",
                    ),

                    PremiumButton(
                      Icons.favorite,
                      "Manucure",
                    ),
                  ],
                ),

                const SizedBox(height: 50),

                const PremiumCard(
                  "Pose Gel",
                  "25€",
                ),

                const PremiumCard(
                  "Nail Art",
                  "15€",
                ),

                const PremiumCard(
                  "Remplissage",
                  "20€",
                ),

                const PremiumCard(
                  "Manucure",
                  "15€",
                ),

                const SizedBox(height: 30),
              ],
            ),
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

        itemBuilder: (context, index) {

          return Container(

            decoration: BoxDecoration(

              borderRadius:
                  BorderRadius.circular(25),

              gradient: const LinearGradient(
                colors: [
                  Colors.pinkAccent,
                  Colors.black,
                ],
              ),

              boxShadow: const [

                BoxShadow(
                  color: Colors.pinkAccent,
                  blurRadius: 10,
                ),
              ],
            ),

            child: const Icon(
              Icons.image,
              color: Colors.white,
              size: 60,
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

      appBar: AppBar(
        backgroundColor: Colors.pinkAccent,
        title: const Text("Prestations"),
      ),

      body: ListView(

        padding: const EdgeInsets.all(20),

        children: const [

          PremiumCard("Pose Gel", "25€"),
          PremiumCard("Nail Art", "15€"),
          PremiumCard("Remplissage", "20€"),
          PremiumCard("Manucure", "15€"),
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

          ContactTile(Icons.phone, "06 12 34 56 78"),
          ContactTile(Icons.message, "WhatsApp"),
          ContactTile(Icons.camera_alt, "@nailspassion"),
          ContactTile(Icons.location_on, "Paris"),
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

          margin: const EdgeInsets.all(30),

          padding: const EdgeInsets.all(30),

          decoration: BoxDecoration(

            color: Colors.white10,

            borderRadius:
                BorderRadius.circular(30),

            boxShadow: const [

              BoxShadow(
                color: Colors.pinkAccent,
                blurRadius: 20,
              ),
            ],
          ),

          child: const Column(

            mainAxisSize: MainAxisSize.min,

            children: [

              Icon(
                Icons.lock,
                size: 90,
                color: Colors.pinkAccent,
              ),

              SizedBox(height: 20),

              Text(

                "Code Admin : 0712",

                style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class PremiumButton extends StatelessWidget {

  final IconData icon;
  final String text;

  const PremiumButton(
    this.icon,
    this.text, {
      super.key,
    });

  @override
  Widget build(BuildContext context) {

    return Column(

      children: [

        Container(

          padding: const EdgeInsets.all(20),

          decoration: BoxDecoration(

            color: Colors.pinkAccent,

            borderRadius:
                BorderRadius.circular(50),

            boxShadow: const [

              BoxShadow(
                color: Colors.pinkAccent,
                blurRadius: 20,
              ),
            ],
          ),

          child: Icon(
            icon,
            size: 35,
            color: Colors.white,
          ),
        ),

        const SizedBox(height: 10),

        Text(

          text,

          style: const TextStyle(
            color: Colors.white,
            fontSize: 18,
          ),
        ),
      ],
    );
  }
}

class PremiumCard extends StatelessWidget {

  final String title;
  final String price;

  const PremiumCard(
    this.title,
    this.price, {
      super.key,
    });

  @override
  Widget build(BuildContext context) {

    return Container(

      margin: const EdgeInsets.only(bottom: 20),

      padding: const EdgeInsets.all(22),

      decoration: BoxDecoration(

        color: Colors.white10,

        borderRadius:
            BorderRadius.circular(30),

        boxShadow: const [

          BoxShadow(
            color: Colors.pinkAccent,
            blurRadius: 12,
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
              fontSize: 24,
            ),
          ),

          Text(

            price,

            style: const TextStyle(
              color: Colors.pinkAccent,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class ContactTile extends StatelessWidget {

  final IconData icon;
  final String text;

  const ContactTile(
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
              color: Colors.white,
              fontSize: 20,
            ),
          ),
        ],
      ),
    );
  }
}
