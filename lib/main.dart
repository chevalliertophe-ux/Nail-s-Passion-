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
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.black,
        fontFamily: 'Roboto',
      ),
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

      body: SingleChildScrollView(

        child: Column(

          children: [

            Stack(

              children: [

                Container(

                  height: 430,

                  decoration: const BoxDecoration(

                    image: DecorationImage(

                      image: NetworkImage(
                        "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
                      ),

                      fit: BoxFit.cover,
                    ),
                  ),
                ),

                Container(

                  height: 430,

                  decoration: BoxDecoration(

                    gradient: LinearGradient(

                      colors: [

                        Colors.black.withOpacity(0.9),

                        Colors.transparent,

                        Colors.black,
                      ],

                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
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
                              size: 30,
                            ),

                            Container(

                              padding:
                                  const EdgeInsets.all(12),

                              decoration: BoxDecoration(

                                color: Colors.pinkAccent,

                                borderRadius:
                                    BorderRadius.circular(20),

                                boxShadow: [

                                  BoxShadow(
                                    color: Colors.pinkAccent
                                        .withOpacity(0.7),

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

                          padding:
                              const EdgeInsets.all(25),

                          decoration: BoxDecoration(

                            shape: BoxShape.circle,

                            color: Colors.black,

                            boxShadow: [

                              BoxShadow(
                                color: Colors.pinkAccent
                                    .withOpacity(0.6),

                                blurRadius: 40,
                              ),
                            ],
                          ),

                          child: const Icon(
                            Icons.workspace_premium,
                            color: Colors.amber,
                            size: 80,
                          ),
                        ),

                        const SizedBox(height: 25),

                        const Text(

                          "Nail's Passion",

                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        const SizedBox(height: 10),

                        const Text(

                          "Beauté • Élégance • Premium",

                          style: TextStyle(
                            color: Colors.white70,
                            fontSize: 18,
                          ),
                        ),

                        const SizedBox(height: 30),

                        const Text(

                          "La beauté est notre passion 💖",

                          textAlign: TextAlign.center,

                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        const SizedBox(height: 35),

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

            const SizedBox(height: 30),

            const Text(
              "Nos Prestations",
              style: TextStyle(
                color: Colors.white,
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 25),

            serviceCard(
              "Pose Gel",
              "25€",
              Icons.brush,
            ),

            serviceCard(
              "Nail Art",
              "15€",
              Icons.auto_awesome,
            ),

            serviceCard(
              "Remplissage",
              "20€",
              Icons.favorite,
            ),

            serviceCard(
              "Manucure",
              "15€",
              Icons.spa,
            ),

            const SizedBox(height: 35),

            const Text(
              "Galerie",
              style: TextStyle(
                color: Colors.white,
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 20),

            Padding(

              padding:
                  const EdgeInsets.symmetric(
                horizontal: 15,
              ),

              child: GridView.count(

                shrinkWrap: true,

                physics:
                    const NeverScrollableScrollPhysics(),

                crossAxisCount: 2,

                crossAxisSpacing: 12,

                mainAxisSpacing: 12,

                children: List.generate(
                  6,
                  (index) {

                    return Container(

                      decoration: BoxDecoration(

                        borderRadius:
                            BorderRadius.circular(25),

                        image: const DecorationImage(

                          image: NetworkImage(
                            "https://images.unsplash.com/photo-1604654894610-df63bc536371",
                          ),

                          fit: BoxFit.cover,
                        ),

                        boxShadow: [

                          BoxShadow(
                            color: Colors.pinkAccent
                                .withOpacity(0.5),

                            blurRadius: 20,
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ),

            const SizedBox(height: 100),
          ],
        ),
      ),

      bottomNavigationBar: BottomNavigationBar(

        backgroundColor: Colors.black,

        selectedItemColor:
            Colors.pinkAccent,

        unselectedItemColor:
            Colors.white54,

        type:
            BottomNavigationBarType.fixed,

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

  static Widget premiumButton(
    IconData icon,
    String text,
  ) {

    return Container(

      padding:
          const EdgeInsets.symmetric(
        horizontal: 25,
        vertical: 16,
      ),

      decoration: BoxDecoration(

        color: Colors.pinkAccent,

        borderRadius:
            BorderRadius.circular(30),

        boxShadow: [

          BoxShadow(
            color: Colors.pinkAccent
                .withOpacity(0.6),

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
              fontSize: 18,
            ),
          ),
        ],
      ),
    );
  }

  static Widget serviceCard(
    String title,
    String price,
    IconData icon,
  ) {

    return Container(

      margin:
          const EdgeInsets.symmetric(
        horizontal: 18,
        vertical: 10,
      ),

      padding:
          const EdgeInsets.all(22),

      decoration: BoxDecoration(

        color: const Color(0xFF151515),

        borderRadius:
            BorderRadius.circular(25),

        boxShadow: [

          BoxShadow(
            color: Colors.pinkAccent
                .withOpacity(0.35),

            blurRadius: 25,
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
                size: 30,
              ),

              const SizedBox(width: 15),

              Text(

                title,

                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                ),
              ),
            ],
          ),

          Text(

            price,

            style: const TextStyle(
              color: Colors.pinkAccent,
              fontSize: 24,
              fontWeight:
                  FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
// premium navigation rebuild
