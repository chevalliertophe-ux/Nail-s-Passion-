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
                  height: 520,
                  width: double.infinity,

                  decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: NetworkImage(
                        'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200'
                      ),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),

                Container(
                  height: 520,
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

                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 25,
                    vertical: 70,
                  ),

                  child: Column(
                    children: [

                      Row(
                        mainAxisAlignment:
                            MainAxisAlignment.spaceBetween,

                        children: [

                          const Icon(
                            Icons.menu,
                            color: Colors.white,
                            size: 38,
                          ),

                          Container(
                            padding: const EdgeInsets.all(15),

                            decoration: BoxDecoration(
                              color: Colors.pinkAccent,
                              borderRadius:
                                  BorderRadius.circular(20),

                              boxShadow: [
                                BoxShadow(
                                  color: Colors.pinkAccent
                                      .withOpacity(0.7),
                                  blurRadius: 25,
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

                      const SizedBox(height: 60),

                      Container(
                        padding: const EdgeInsets.all(30),

                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.4),
                          shape: BoxShape.circle,
                        ),

                        child: const Icon(
                          Icons.workspace_premium,
                          color: Colors.amber,
                          size: 90,
                        ),
                      ),

                      const SizedBox(height: 25),

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

                      const SizedBox(height: 45),

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

                      premiumButton(
                        Icons.calendar_month,
                        "Réserver",
                      ),

                      const SizedBox(height: 25),

                      premiumButton(
                        Icons.phone,
                        "Contact",
                      ),
                    ],
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

            const SizedBox(height: 25),

            serviceCard("💅", "Pose Gel", "25€"),
            serviceCard("✨", "Nail Art", "15€"),
            serviceCard("💖", "Remplissage", "20€"),
            serviceCard("🌷", "Manucure", "15€"),

            const SizedBox(height: 50),

            const Text(
              "Galerie",

              style: TextStyle(
                color: Colors.white,
                fontSize: 34,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 25),

            galleryImage(
              "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200",
            ),

            galleryImage(
              "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200",
            ),

            galleryImage(
              "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1200",
            ),

            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget premiumButton(
    IconData icon,
    String text,
  ) {
    return Container(
      width: 280,
      height: 75,

      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(40),

        gradient: const LinearGradient(
          colors: [
            Colors.pinkAccent,
            Color(0xFFFF5DA2),
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
        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Icon(
            icon,
            color: Colors.white,
            size: 32,
          ),

          const SizedBox(width: 15),

          Text(
            text,

            style: const TextStyle(
              color: Colors.white,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget serviceCard(
    String emoji,
    String title,
    String price,
  ) {
    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 10,
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

              Text(
                emoji,
                style: const TextStyle(fontSize: 34),
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

  Widget galleryImage(String url) {
    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 12,
      ),

      height: 240,

      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),

        image: DecorationImage(
          image: NetworkImage(url),
          fit: BoxFit.cover,
        ),

        boxShadow: [
          BoxShadow(
            color: Colors.pinkAccent.withOpacity(0.35),
            blurRadius: 25,
          ),
        ],
      ),
    );
  }
}
