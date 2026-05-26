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
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: pages[currentIndex],

      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black,
        selectedItemColor: Colors.pink,
        unselectedItemColor: Colors.white70,
        currentIndex: currentIndex,

        onTap: (index) async {

          // ADMIN CACHÉ
          if (index == 3) {

            final pin = await showDialog(
              context: context,
              builder: (context) {

                TextEditingController controller =
                    TextEditingController();

                return AlertDialog(
                  backgroundColor: Colors.black,

                  title: const Text(
                    "Code Admin",
                    style: TextStyle(color: Colors.pink),
                  ),

                  content: TextField(
                    controller: controller,
                    obscureText: true,
                    style: const TextStyle(color: Colors.white),

                    decoration: const InputDecoration(
                      hintText: "PIN",
                      hintStyle: TextStyle(
                        color: Colors.white54,
                      ),
                    ),
                  ),

                  actions: [

                    TextButton(
                      onPressed: () {
                        Navigator.pop(context, controller.text);
                      },

                      child: const Text(
                        "Connexion",
                        style: TextStyle(
                          color: Colors.pink,
                        ),
                      ),
                    )
                  ],
                );
              },
            );

            if (pin == "1234") {

              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const AdminPage(),
                ),
              );
            }
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
        backgroundColor: Colors.black,
        centerTitle: true,

        title: const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            Icon(
              Icons.workspace_premium,
              color: Colors.amber,
            ),

            SizedBox(width: 10),

            Text(
              "Nail's Passion",
              style: TextStyle(
                color: Colors.pink,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),

      body: SingleChildScrollView(

        child: Padding(
          padding: const EdgeInsets.all(20),

          child: Column(

            children: [

              const SizedBox(height: 20),

              Container(
                height: 250,

                decoration: BoxDecoration(

                  borderRadius: BorderRadius.circular(30),

                  gradient: const LinearGradient(
                    colors: [
                      Colors.pink,
                      Colors.black,
                    ],
                  ),
                ),

                child: const Center(
                  child: Text(
                    "La beauté est notre passion",
                    textAlign: TextAlign.center,

                    style: TextStyle(
                      fontSize: 34,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
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

              const SizedBox(height: 40),

              const Align(
                alignment: Alignment.centerLeft,

                child: Text(
                  "Nos Prestations",

                  style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: Colors.pink,
                  ),
                ),
              ),

              const SizedBox(height: 20),

              const ServiceCard("Pose Gel", "25€"),
              const ServiceCard("Nail Art", "15€"),
              const ServiceCard("Remplissage", "20€"),
              const ServiceCard("Manucure", "15€"),
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
        backgroundColor: Colors.black,

        title: const Text(
          "Galerie",
          style: TextStyle(color: Colors.pink),
        ),
      ),

      body: GridView.count(

        crossAxisCount: 2,

        padding: const EdgeInsets.all(20),

        crossAxisSpacing: 15,
        mainAxisSpacing: 15,

        children: List.generate(

          8,

          (index) => Container(

            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),

              gradient: const LinearGradient(
                colors: [
                  Colors.pink,
                  Colors.black,
                ],
              ),
            ),

            child: const Icon(
              Icons.photo,
              size: 50,
              color: Colors.white,
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
        backgroundColor: Colors.black,

        title: const Text(
          "Prestations",
          style: TextStyle(color: Colors.pink),
        ),
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

        title: const Text(
          "Contact",
          style: TextStyle(color: Colors.pink),
        ),
      ),

      body: Padding(
        padding: const EdgeInsets.all(20),

        child: Column(

          children: const [

            ContactCard(
              Icons.phone,
              "06 12 34 56 78",
            ),

            SizedBox(height: 20),

            ContactCard(
              Icons.email,
              "contact@nailspassion.fr",
            ),

            SizedBox(height: 20),

            ContactCard(
              Icons.location_on,
              "Paris, France",
            ),
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
        backgroundColor: Colors.pink,

        title: const Text("Admin"),
      ),

      body: ListView(

        padding: const EdgeInsets.all(20),

        children: const [

          AdminCard(
            Icons.edit,
            "Modifier infos",
          ),

          SizedBox(height: 20),

          AdminCard(
            Icons.attach_money,
            "Prestations & tarifs",
          ),

          SizedBox(height: 20),

          AdminCard(
            Icons.photo_library,
            "Galerie photos",
          ),

          SizedBox(height: 20),

          AdminCard(
            Icons.schedule,
            "Horaires",
          ),

          SizedBox(height: 20),

          AdminCard(
            Icons.local_offer,
            "Promotions",
          ),
        ],
      ),
    );
  }
}

class FeatureItem extends StatelessWidget {

  final IconData icon;
  final String title;

  const FeatureItem(
    this.icon,
    this.title,
    {super.key},
  );

  @override
  Widget build(BuildContext context) {

    return Column(

      children: [

        CircleAvatar(
          radius: 35,
          backgroundColor: Colors.pink,

          child: Icon(
            icon,
            size: 35,
            color: Colors.white,
          ),
        ),

        const SizedBox(height: 10),

        Text(
          title,
          style: const TextStyle(fontSize: 18),
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
    this.price,
    {super.key},
  );

  @override
  Widget build(BuildContext context) {

    return Container(

      margin: const EdgeInsets.only(bottom: 20),

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: Colors.white10,

        borderRadius: BorderRadius.circular(20),

        border: Border.all(
          color: Colors.pink,
        ),
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
              fontSize: 24,
              color: Colors.pink,
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
    this.text,
    {super.key},
  );

  @override
  Widget build(BuildContext context) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: Colors.white10,

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

class AdminCard extends StatelessWidget {

  final IconData icon;
  final String title;

  const AdminCard(
    this.icon,
    this.title,
    {super.key},
  );

  @override
  Widget build(BuildContext context) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: Colors.white10,

        borderRadius: BorderRadius.circular(20),
      ),

      child: Row(

        children: [

          Icon(
            icon,
            color: Colors.pink,
            size: 30,
          ),

          const SizedBox(width: 20),

          Text(
            title,

            style: const TextStyle(
              fontSize: 20,
            ),
          ),
        ],
      ),
    );
  }
}
