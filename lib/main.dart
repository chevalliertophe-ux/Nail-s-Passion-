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
    const GaleriePage(),
    const PrestationsPage(),
    const ContactPage(),
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

          if(index == 4){
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => const AdminLoginPage(),
              ),
            );
            return;
          }

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
            label: "",
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

      body: SingleChildScrollView(
        child: Column(
          children: [

            const SizedBox(height: 60),

            Image.asset(
              'assets/logo.png',
              height: 140,
            ),

            const SizedBox(height: 20),

            const Text(
              "Nail's Passion",
              style: TextStyle(
                fontSize: 38,
                color: Colors.pinkAccent,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            const Text(
              "La beauté est notre passion",
              style: TextStyle(
                fontSize: 20,
                color: Colors.white70,
              ),
            ),

            const SizedBox(height: 40),

            Container(
              margin: const EdgeInsets.all(20),
              height: 260,

              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),

                gradient: const LinearGradient(
                  colors: [
                    Colors.pinkAccent,
                    Colors.black,
                  ],
                ),

                boxShadow: const [
                  BoxShadow(
                    color: Colors.pinkAccent,
                    blurRadius: 20,
                  )
                ],
              ),

              child: const Center(
                child: Icon(
                  Icons.auto_awesome,
                  color: Colors.white,
                  size: 120,
                ),
              ),
            ),

            const SizedBox(height: 20),

            premiumButton("Réserver maintenant"),
            premiumButton("Nous contacter"),

            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget premiumButton(String text){

    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 10,
      ),

      height: 60,

      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),

        gradient: const LinearGradient(
          colors: [
            Colors.pinkAccent,
            Colors.deepPurple,
          ],
        ),

        boxShadow: const [
          BoxShadow(
            color: Colors.pinkAccent,
            blurRadius: 20,
          )
        ],
      ),

      child: Center(
        child: Text(
          text,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}

class GaleriePage extends StatelessWidget {
  const GaleriePage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text("Galerie"),
      ),

      body: GridView.builder(
        padding: const EdgeInsets.all(15),

        gridDelegate:
        const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 15,
          mainAxisSpacing: 15,
        ),

        itemCount: 8,

        itemBuilder: (_, index){

          return Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),

              gradient: const LinearGradient(
                colors: [
                  Colors.pinkAccent,
                  Colors.black,
                ],
              ),
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
        backgroundColor: Colors.black,
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
        backgroundColor: Colors.black,
        title: const Text("Contact"),
      ),

      body: ListView(
        padding: const EdgeInsets.all(20),

        children: const [

          ContactCard(Icons.phone, "06 12 34 56 78"),
          ContactCard(Icons.email, "contact@nailspassion.fr"),
          ContactCard(Icons.location_on, "Paris"),
        ],
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
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(25),

        color: Colors.white10,

        boxShadow: const [
          BoxShadow(
            color: Colors.pinkAccent,
            blurRadius: 15,
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
            ),
          ),

          Text(
            price,
            style: const TextStyle(
              color: Colors.pinkAccent,
              fontSize: 24,
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
        borderRadius: BorderRadius.circular(25),
        color: Colors.white10,
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
            ),
          ),
        ],
      ),
    );
  }
}

class AdminLoginPage extends StatefulWidget {
  const AdminLoginPage({super.key});

  @override
  State<AdminLoginPage> createState() =>
      _AdminLoginPageState();
}

class _AdminLoginPageState
    extends State<AdminLoginPage> {

  final controller = TextEditingController();

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text("Admin"),
      ),

      body: Padding(
        padding: const EdgeInsets.all(30),

        child: Column(
          children: [

            const SizedBox(height: 40),

            const Icon(
              Icons.lock,
              color: Colors.pinkAccent,
              size: 100,
            ),

            const SizedBox(height: 30),

            TextField(
              controller: controller,

              keyboardType:
              TextInputType.number,

              obscureText: true,

              decoration: InputDecoration(
                hintText: "Code admin",

                filled: true,

                fillColor: Colors.white10,

                border: OutlineInputBorder(
                  borderRadius:
                  BorderRadius.circular(20),
                ),
              ),
            ),

            const SizedBox(height: 30),

            ElevatedButton(

              onPressed: () {

                if(controller.text == "0712"){

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) =>
                      const AdminPage(),
                    ),
                  );
                }
              },

              child: const Text("Connexion"),
            )
          ],
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

      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text("Admin"),
      ),

      body: ListView(
        padding: const EdgeInsets.all(20),

        children: const [

          AdminTile("Modifier infos"),
          AdminTile("Prestations"),
          AdminTile("Galerie"),
          AdminTile("Promotions"),
        ],
      ),
    );
  }
}

class AdminTile extends StatelessWidget {

  final String title;

  const AdminTile(
      this.title, {
        super.key,
      });

  @override
  Widget build(BuildContext context) {

    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: Colors.white10,
      ),

      child: Text(
        title,
        style: const TextStyle(
          fontSize: 20,
        ),
      ),
    );
  }
}
