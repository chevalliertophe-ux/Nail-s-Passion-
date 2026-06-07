"""Generate Nail's Passion logo via Gemini Nano Banana."""
import asyncio
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv(Path(__file__).parent.parent / '.env')

OUTPUT_DIR = Path(__file__).parent.parent / "static" / "branding"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


async def generate_logo():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("Missing EMERGENT_LLM_KEY")
        return

    prompt = (
        "Ultra-premium logo design for a luxury nail salon called 'Nail's Passion'. "
        "Stylized cursive elegant letter N as the centerpiece, in vibrant hot magenta pink (#FF1493) "
        "with neon glow, topped with a delicate ornate gold crown (#FFD700). "
        "Below the N, the words 'Nail's Passion' in elegant flowing cursive script (Great Vibes style), in white with subtle pink glow. "
        "Pure deep black background. Pink smoke wisps and gold sparkles around. Feminine, girly, glamorous, luxurious. "
        "Centered composition, square 1:1, crisp vector-like quality, high contrast. "
        "Style: modern luxury beauty branding, fashion magazine aesthetic. No text artifacts, no extra letters."
    )

    chat = LlmChat(
        api_key=api_key,
        session_id="nails-logo-gen",
        system_message="You are an expert brand identity designer specializing in luxury beauty logos."
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])

    msg = UserMessage(text=prompt)
    text, images = await chat.send_message_multimodal_response(msg)

    if not images:
        print("No image generated")
        print("Text:", text[:200])
        return

    for i, img in enumerate(images):
        image_bytes = base64.b64decode(img['data'])
        out = OUTPUT_DIR / f"logo{'' if i == 0 else f'_{i}'}.png"
        out.write_bytes(image_bytes)
        print(f"Saved {out} ({len(image_bytes)} bytes)")

    # Also generate a app icon (round)
    icon_prompt = (
        "App icon for 'Nail's Passion' nail salon mobile app. Ornate cursive letter N in vibrant hot pink (#FF1493) "
        "with elegant tiny gold crown (#FFD700) on top, pure deep black circular background, "
        "subtle pink neon glow ring around the edge, sparkle accents. "
        "iOS/Android style. Square 1:1, centered, simple and iconic. No text, just the N+crown emblem."
    )
    chat2 = LlmChat(
        api_key=api_key,
        session_id="nails-icon-gen",
        system_message="You are an expert brand identity designer."
    )
    chat2.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])

    msg2 = UserMessage(text=icon_prompt)
    _, icons = await chat2.send_message_multimodal_response(msg2)
    if icons:
        for i, img in enumerate(icons):
            image_bytes = base64.b64decode(img['data'])
            out = OUTPUT_DIR / f"icon{'' if i == 0 else f'_{i}'}.png"
            out.write_bytes(image_bytes)
            print(f"Saved {out} ({len(image_bytes)} bytes)")


if __name__ == "__main__":
    asyncio.run(generate_logo())
