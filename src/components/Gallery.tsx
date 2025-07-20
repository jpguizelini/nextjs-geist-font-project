'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from './Modal'

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
  title: string
  description: string
  photographer: string
}

// Mock data for the gallery
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg',
    alt: 'Skater performing trick',
    category: 'tricks',
    title: 'Perfect Kickflip',
    description: 'Amazing kickflip captured at the perfect moment',
    photographer: 'Alex Rodriguez'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg',
    alt: 'Skateboard park overview',
    category: 'park',
    title: 'Park Overview',
    description: 'Aerial view of our concrete paradise',
    photographer: 'Maria Santos'
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg',
    alt: 'Skater in bowl',
    category: 'bowl',
    title: 'Bowl Session',
    description: 'Deep carve in the main bowl section',
    photographer: 'Jake Thompson'
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/1263347/pexels-photo-1263347.jpeg',
    alt: 'Street skating',
    category: 'street',
    title: 'Street Style',
    description: 'Technical street skating at its finest',
    photographer: 'Sam Wilson'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg',
    alt: 'Competition event',
    category: 'events',
    title: 'Summer Competition',
    description: 'Annual summer skateboarding competition',
    photographer: 'Lisa Chen'
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg',
    alt: 'Night session',
    category: 'night',
    title: 'Night Session',
    description: 'Late night skating under the lights',
    photographer: 'Mike Davis'
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg',
    alt: 'Beginner lesson',
    category: 'lessons',
    title: 'Learning the Basics',
    description: 'Teaching the next generation of skaters',
    photographer: 'Anna Johnson'
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/1263347/pexels-photo-1263347.jpeg',
    alt: 'Community gathering',
    category: 'community',
    title: 'Community Day',
    description: 'Monthly community gathering and BBQ',
    photographer: 'Tom Brown'
  }
]

const categories = [
  { value: 'all', label: 'All Photos' },
  { value: 'tricks', label: 'Tricks' },
  { value: 'park', label: 'Park' },
  { value: 'bowl', label: 'Bowl' },
  { value: 'street', label: 'Street' },
  { value: 'events', label: 'Events' },
  { value: 'night', label: 'Night' },
  { value: 'lessons', label: 'Lessons' },
  { value: 'community', label: 'Community' }
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="py-12">
      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.value
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        layout
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="group cursor-pointer overflow-hidden bg-gray-100 aspect-square"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => openModal(image)}
            layout
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-sm">{image.title}</h3>
                  <p className="text-xs opacity-80">{image.photographer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <Modal isOpen={!!selectedImage} onClose={closeModal}>
        {selectedImage && (
          <div className="max-w-4xl">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedImage.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Photo by {selectedImage.photographer}</span>
                <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                  {selectedImage.category}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors">
                  Share Photo
                </button>
                <button className="border border-gray-300 text-black px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
