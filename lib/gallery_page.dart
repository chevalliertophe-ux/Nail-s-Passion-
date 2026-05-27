import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class GalleryPage extends StatelessWidget {
  const GalleryPage({super.key});

  Future<void> openUrl(String url) async {
    final uri = Uri.parse(url);

    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
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
            color: Colors.pinkAccent.withOpacity(0.4),
            blurRadius: 25,
          ),
        ],
      ),
    );
  }

  Widget socialButton(
    IconData icon,
    String text,
    VoidCallback onTap,
  ) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(
          horizontal: 25,
          vertical: 10,
        ),
        padding: const EdgeInsets.all(22),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(25),
          gradient: const LinearGradient(
            colors: [
              Color(0xFFFF4FA3),
              Color(0xFFFF2E88),
            ],
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.pinkAccent.withOpacity(0.45),
              blurRadius: 20,
            ),
          ],
        ),
        child: Row(
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
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        child: Column(
          children: [

            const SizedBox(height: 50),

            const Text(
              "Galerie Luxe",
              style: TextStyle(
                color: Colors.white,
                fontSize: 34,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 30),

            galleryImage(
              "https://images.unsplash.com/photo-1610992015732-2449b76344bc",
            ),

            galleryImage(
              "https://images.unsplash.com/photo-1604654894610-df63bc536371",
            ),

            galleryImage(
              "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
            ),

            const SizedBox(height: 30),

            socialButton(
              Icons.camera_alt,
              "Instagram",
              () {
                openUrl("https://instagram.com");
              },
            ),

            socialButton(
              Icons.phone,
              "WhatsApp",
              () {
                openUrl("https://wa.me/");
              },
            ),

            const SizedBox(height: 50),
          ],
        ),
      ),
    );
  }
}
