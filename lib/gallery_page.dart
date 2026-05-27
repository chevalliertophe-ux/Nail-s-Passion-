import 'package:flutter/material.dart';

class GalleryPage extends StatelessWidget {
  const GalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final images = [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200',
    ];

    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text("Galerie"),
      ),

      body: GridView.builder(
        padding: const EdgeInsets.all(20),
        itemCount: images.length,

        gridDelegate:
            const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 15,
          mainAxisSpacing: 15,
        ),

        itemBuilder: (context, index) {
          return Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(25),

              image: DecorationImage(
                image: NetworkImage(images[index]),
                fit: BoxFit.cover,
              ),

              boxShadow: [
                BoxShadow(
                  color: Colors.pinkAccent.withOpacity(0.4),
                  blurRadius: 20,
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
