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

            Stack(
              children: [

                Container(
                  height: 500,
                  width: double.infinity,

                  decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: NetworkImage(
'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1200',
                      ),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),

                Container(
                  height: 500,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.black.withOpacity(0.3),
                        Colors.black.withOpacity(0.95),
                      ],
                    ),
                  ),
                ),

                SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.all(20),

                    child: Column(
                      children: [

                        Row(
                          mainAxisAlignment:
                              MainAxisAlignment.spaceBetween,

                          children: [

                            premiumIcon(Icons.menu),

                            premiumIcon(Icons.notifications),
                          ],
                        ),

                        const SizedBox(height: 40),

                        Container(
                          height: 140,
                          width: 140,

                          decoration: BoxDecoration(
                            color: Colors.black,
                            shape: BoxShape.circle,

                            boxShadow: [
                              BoxShadow(
                                color:
                                    Colors.pinkAccent.withOpacity(0.7),
                                blurRadius: 40,
                                spreadRadius: 5,
                              ),
                            ],
                          ),

                          child: const Icon(
                            Icons.workspace_premium,
                            color: Colors.amber,
                            size: 80,
                          ),
                        ),

                        const SizedBox(height: 30),

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
                            fontSize: 20,
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
                          mainAxisAlignment:
                              MainAxisAlignment.spaceEvenly,

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
                      ],
                    ),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 20),

            const Text(
              "Nos Prestations",
              style: TextStyle(
                color: Colors.white,
                fontSize: 38,
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
}

Widget premiumIcon(IconData icon) {
  return Container(
    padding: const EdgeInsets.all(16),

    decoration: BoxDecoration(
      color: Colors.pinkAccent,
      shape: BoxShape.circle,

      boxShadow: [
        BoxShadow(
          color: Colors.pinkAccent.withOpacity(0.7),
          blurRadius: 25,
        ),
      ],
    ),

    child: Icon(
      icon,
      color: Colors.white,
      size: 28,
    ),
  );
}

Widget premiumButton(
  IconData icon,
  String title,
) {
  return Container(
    padding: const EdgeInsets.symmetric(
      horizontal: 35,
      vertical: 18,
    ),

    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(40),

      gradient: const LinearGradient(
        colors: [
          Colors.pinkAccent,
          Colors.pink,
        ],
      ),

      boxShadow: [
        BoxShadow(
          color: Colors.pinkAccent.withOpacity(0.7),
          blurRadius: 25,
        ),
      ],
    ),

    child: Row(
      children: [

        Icon(
          icon,
          color: Colors.white,
        ),

        const SizedBox(width: 10),

        Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    ),
  );
}

Widget serviceCard(
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
      color: Colors.white.withOpacity(0.05),

      borderRadius: BorderRadius.circular(30),

      boxShadow: [
        BoxShadow(
          color: Colors.pinkAccent.withOpacity(0.3),
          blurRadius: 30,
          spreadRadius: 2,
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
              size: 36,
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
