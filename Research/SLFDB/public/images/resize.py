import os
from PIL import Image

def resize_images(input_folder, output_folder, width, height):
    """
    Resizes all images in the input_folder to the specified width and height.
    Saves resized images to output_folder.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('png', 'jpg', 'jpeg', 'bmp', 'gif')):
            img_path = os.path.join(input_folder, filename)
            img = Image.open(img_path)
            img_resized = img.resize((width, height), Image.ANTIALIAS)
            
            output_path = os.path.join(output_folder, filename)
            img_resized.save(output_path)
            print(f"Resized and saved: {output_path}")

if __name__ == "__main__":
    input_folder = "./Scene_6"  # Change this to your folder path
    output_folder = "./Scene_6"  # Change this to your desired output folder
    width, height = 512, 512  # Set your desired resolution
    
    resize_images(input_folder, output_folder, width, height)
