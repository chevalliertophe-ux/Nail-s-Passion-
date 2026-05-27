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
                        'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
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

                            const Icon(
                              Icons.menu,
                              color: Colors.white,
                              size: 35,
                            ),

                            Container(
                              padding: const EdgeInsets.all(14),

                              decoration: BoxDecoration(
                                color: Colors.pinkAccent,
                                borderRadius:
                                    BorderRadius.circular(30),

                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.pinkAccent
                                        .withOpacity(0.6),
                                    blurRadius: 20,
                                  ),
                                ],
                              ),

                              child: const Icon(
                                Icons.notifications,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 40),

                        Container(
                          width: 150,
                          height: 150,

                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.black,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.pinkAccent
                                    .withOpacity(0.7),
                                blurRadius: 40,
                              ),
                            ],
                          ),

                          child: const Center(
                            child: Text(
                              "N",
                              style: TextStyle(
                                color: Colors.pinkAccent,
                                fontSize: 80,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 30),

                        const Text(
                          "Nail's Passion",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 46,
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

                        const SizedBox(height: 50),

                        const Text(
                          "La beauté est ma passion 💖",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 38,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        const SizedBox(height: 50),

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
                fontSize: 36,
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
        horizontal: 30,
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

          Icon(
            icon,
            color: Colors.white,
          ),

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
            color: Colors.pinkAccent.withOpacity(0.25),
            blurRadius: 30,
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
