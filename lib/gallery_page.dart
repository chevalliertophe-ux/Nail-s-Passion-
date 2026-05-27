import 'package:flutter/material.dart';

class GalleryPage extends StatelessWidget {
  const GalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,

        title: const Text(
          "Galerie Luxe",
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),

      body: ListView(
        padding: const EdgeInsets.all(20),

        children: [

          luxuryImage(
            "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1200",
          ),

          luxuryImage(
            "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=1200",
          ),

          luxuryImage(
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
          ),

          luxuryImage(
            "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200",
          ),

          const SizedBox(height: 40),

          Container(
            padding: const EdgeInsets.all(25),

            decoration: BoxDecoration(
              color: const Color(0xFF111111),
              borderRadius: BorderRadius.circular(30),

              boxShadow: [
                BoxShadow(
                  color: Colors.pinkAccent.withOpacity(0.3),
                  blurRadius: 25,
                ),
              ],
            ),

            child: Column(
              children: [

                const Text(
                  "Suivez-nous 💖",

                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 30),

                socialButton(
                  Icons.camera_alt,
                  "Instagram",
                  Colors.pinkAccent,
                ),

                const SizedBox(height: 20),

                socialButton(
                  Icons.chat,
                  "WhatsApp",
                  Colors.green,
                ),
              ],
            ),
          ),

          const SizedBox(height: 50),
        ],
      ),
    );
  }

  Widget luxuryImage(String url) {
    return Container(
      margin: const EdgeInsets.only(bottom: 25),

      height: 260,

      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),

        image: DecorationImage(
          image: NetworkImage(url),
          fit: BoxFit.cover,
        ),

        boxShadow: [
          BoxShadow(
            color: Colors.pinkAccent.withOpacity(0.4),
            blurRadius: 30,
          ),
        ],
      ),
    );
  }

  Widget socialButton(
    IconData icon,
    String text,
    Color color,
  ) {
    return Container(
      height: 70,

      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(25),
        color: color,

        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.5),
            blurRadius: 20,
          ),
        ],
      ),

      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Icon(
            icon,
            color: Colors.white,
            size: 30,
          ),

          const SizedBox(width: 15),

          Text(
            text,

            style: const TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
