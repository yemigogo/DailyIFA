#!/usr/bin/env python3
"""
Yorùbá Cosmic Realms 3D Visualization
A beautiful interactive visualization of the three sacred realms:
Òrun (Purple Heavenly Realm), Ayé (Green Earth), and Ilẹ̀-Ọkùn (Blue Ocean)
"""

import vpython as vp
import numpy as np
import math
import random
from time import sleep

# Initialize the 3D scene
scene = vp.canvas(
    title="Yorùbá Cosmic Realms - Interactive 3D Visualization",
    width=1200,
    height=800,
    background=vp.color.black,
    center=vp.vector(0, 0, 0),
    range=15
)

# Sacred colors from Yorùbá tradition
COLORS = {
    'orun': vp.vector(0.4, 0.2, 0.8),      # Purple - Heavenly realm
    'aye': vp.vector(0.2, 0.8, 0.3),       # Green - Earth realm  
    'ile_okun': vp.vector(0.1, 0.4, 0.9),  # Blue - Ocean realm
    'gold': vp.vector(1.0, 0.8, 0.2),      # Sacred gold
    'white': vp.vector(1.0, 1.0, 1.0),     # Pure light
    'silver': vp.vector(0.8, 0.8, 0.9)     # Ancestral silver
}

# Orisha data with authentic associations
ORISHAS = {
    'Ọbàtálá': {'color': COLORS['white'], 'realm': 'orun', 'symbol': '☁️'},
    'Ṣàngó': {'color': vp.vector(0.8, 0.2, 0.2), 'realm': 'aye', 'symbol': '⚡'},
    'Ọ̀ṣun': {'color': COLORS['gold'], 'realm': 'aye', 'symbol': '🌊'},
    'Ògún': {'color': vp.vector(0.1, 0.6, 0.1), 'realm': 'aye', 'symbol': '⚔️'},
    'Yemọja': {'color': COLORS['ile_okun'], 'realm': 'ile_okun', 'symbol': '🌍'},
    'Olókun': {'color': vp.vector(0.0, 0.2, 0.8), 'realm': 'ile_okun', 'symbol': '🐚'},
    'Ọya': {'color': vp.vector(0.6, 0.1, 0.6), 'realm': 'orun', 'symbol': '🌪️'},
    'Ọ̀rúnmìlà': {'color': COLORS['gold'], 'realm': 'orun', 'symbol': '👁️'}
}

class CosmicRealm:
    """Base class for cosmic realms"""
    def __init__(self, name, position, color, size, yoruba_name):
        self.name = name
        self.yoruba_name = yoruba_name
        self.position = position
        self.color = color
        self.size = size
        self.create_realm()
        
    def create_realm(self):
        """Create the visual representation of the realm"""
        pass

class OrunRealm(CosmicRealm):
    """Òrun - The Heavenly Realm (Purple)"""
    def __init__(self):
        super().__init__("Òrun", vp.vector(0, 10, 0), COLORS['orun'], 4, "Òrun")
        
    def create_realm(self):
        # Main heavenly sphere with ethereal glow
        self.main_sphere = vp.sphere(
            pos=self.position,
            radius=self.size,
            color=self.color,
            opacity=0.7,
            emissive=True
        )
        
        # Sacred crown representing divine authority
        crown_points = []
        for i in range(8):
            angle = i * 2 * math.pi / 8
            crown_points.append(vp.vector(
                self.position.x + 2 * math.cos(angle),
                self.position.y + self.size + 1,
                self.position.z + 2 * math.sin(angle)
            ))
        
        # Create crown spikes
        self.crown_spikes = []
        for point in crown_points:
            spike = vp.pyramid(
                pos=point,
                size=vp.vector(0.5, 2, 0.5),
                color=COLORS['gold'],
                axis=vp.vector(0, 1, 0)
            )
            self.crown_spikes.append(spike)
            
        # Floating sacred symbols
        self.symbols = []
        for i in range(12):
            angle = i * 2 * math.pi / 12
            symbol_pos = vp.vector(
                self.position.x + 6 * math.cos(angle),
                self.position.y + 2 * math.sin(angle * 0.5),
                self.position.z + 6 * math.sin(angle)
            )
            symbol = vp.sphere(
                pos=symbol_pos,
                radius=0.3,
                color=COLORS['white'],
                emissive=True
            )
            self.symbols.append(symbol)
            
        # Realm label
        self.label = vp.label(
            pos=self.position + vp.vector(0, self.size + 3, 0),
            text=f"{self.yoruba_name}\n(Heavenly Realm)",
            color=COLORS['white'],
            height=20,
            opacity=0.8
        )

class AyeRealm(CosmicRealm):
    """Ayé - The Earthly Realm (Green)"""
    def __init__(self):
        super().__init__("Ayé", vp.vector(0, 0, 0), COLORS['aye'], 5, "Ayé")
        
    def create_realm(self):
        # Main earth sphere
        self.main_sphere = vp.sphere(
            pos=self.position,
            radius=self.size,
            color=self.color,
            opacity=0.8
        )
        
        # Sacred palm tree (Igi Ọ̀pẹ) - cosmic bridge
        self.palm_trunk = vp.cylinder(
            pos=self.position + vp.vector(0, self.size, 0),
            axis=vp.vector(0, 8, 0),
            radius=0.5,
            color=vp.vector(0.4, 0.2, 0.1)
        )
        
        # Palm fronds
        self.palm_fronds = []
        for i in range(8):
            angle = i * 2 * math.pi / 8
            frond = vp.cylinder(
                pos=self.position + vp.vector(0, self.size + 7, 0),
                axis=vp.vector(3 * math.cos(angle), 2, 3 * math.sin(angle)),
                radius=0.2,
                color=vp.vector(0.1, 0.6, 0.1)
            )
            self.palm_fronds.append(frond)
            
        # Create floating Orisha spheres
        self.orisha_spheres = []
        earth_orishas = [name for name, data in ORISHAS.items() if data['realm'] == 'aye']
        
        for i, orisha_name in enumerate(earth_orishas):
            orisha_data = ORISHAS[orisha_name]
            angle = i * 2 * math.pi / len(earth_orishas)
            sphere_pos = vp.vector(
                self.position.x + 8 * math.cos(angle),
                self.position.y + 3 * math.sin(angle * 2),
                self.position.z + 8 * math.sin(angle)
            )
            
            orisha_sphere = vp.sphere(
                pos=sphere_pos,
                radius=0.8,
                color=orisha_data['color'],
                emissive=True
            )
            
            # Orisha name label
            orisha_label = vp.label(
                pos=sphere_pos + vp.vector(0, 1.5, 0),
                text=f"{orisha_name}\n{orisha_data['symbol']}",
                color=orisha_data['color'],
                height=12,
                opacity=0.9
            )
            
            self.orisha_spheres.append({'sphere': orisha_sphere, 'label': orisha_label, 'name': orisha_name})
            
        # Realm label
        self.label = vp.label(
            pos=self.position + vp.vector(0, self.size + 15, 0),
            text=f"{self.yoruba_name}\n(Earthly Marketplace)",
            color=COLORS['aye'],
            height=20,
            opacity=0.8
        )

class IleOkunRealm(CosmicRealm):
    """Ilẹ̀-Ọkùn - The Oceanic Abyss (Blue)"""
    def __init__(self):
        super().__init__("Ilẹ̀-Ọkùn", vp.vector(0, -10, 0), COLORS['ile_okun'], 4, "Ilẹ̀-Ọkùn")
        
    def create_realm(self):
        # Main oceanic sphere with flowing water effect
        self.main_sphere = vp.sphere(
            pos=self.position,
            radius=self.size,
            color=self.color,
            opacity=0.6
        )
        
        # Create swirling water currents
        self.water_currents = []
        for i in range(16):
            angle = i * 2 * math.pi / 16
            current_pos = vp.vector(
                self.position.x + 6 * math.cos(angle),
                self.position.y + math.sin(angle * 3),
                self.position.z + 6 * math.sin(angle)
            )
            current = vp.sphere(
                pos=current_pos,
                radius=0.2,
                color=vp.vector(0.4, 0.8, 1.0),
                opacity=0.7
            )
            self.water_currents.append(current)
            
        # Sacred shells representing Olókun's wisdom
        self.shells = []
        for i in range(8):
            angle = i * 2 * math.pi / 8
            shell_pos = vp.vector(
                self.position.x + 5 * math.cos(angle),
                self.position.y,
                self.position.z + 5 * math.sin(angle)
            )
            shell = vp.box(
                pos=shell_pos,
                size=vp.vector(0.8, 0.4, 0.6),
                color=COLORS['silver'],
                axis=vp.vector(math.cos(angle), 0, math.sin(angle))
            )
            self.shells.append(shell)
            
        # Ocean Orishas
        ocean_orishas = [name for name, data in ORISHAS.items() if data['realm'] == 'ile_okun']
        self.ocean_orisha_spheres = []
        
        for i, orisha_name in enumerate(ocean_orishas):
            orisha_data = ORISHAS[orisha_name]
            angle = i * math.pi
            sphere_pos = vp.vector(
                self.position.x + 7 * math.cos(angle),
                self.position.y,
                self.position.z + 7 * math.sin(angle)
            )
            
            orisha_sphere = vp.sphere(
                pos=sphere_pos,
                radius=1.0,
                color=orisha_data['color'],
                emissive=True
            )
            
            orisha_label = vp.label(
                pos=sphere_pos + vp.vector(0, -2, 0),
                text=f"{orisha_name}\n{orisha_data['symbol']}",
                color=orisha_data['color'],
                height=12,
                opacity=0.9
            )
            
            self.ocean_orisha_spheres.append({'sphere': orisha_sphere, 'label': orisha_label})
            
        # Realm label
        self.label = vp.label(
            pos=self.position + vp.vector(0, -self.size - 3, 0),
            text=f"{self.yoruba_name}\n(Oceanic Abyss)",
            color=COLORS['ile_okun'],
            height=20,
            opacity=0.8
        )

class CosmicConnection:
    """Creates energy connections between realms"""
    def __init__(self, realm1_pos, realm2_pos, color):
        self.create_connection(realm1_pos, realm2_pos, color)
        
    def create_connection(self, pos1, pos2, color):
        # Energy beam connecting realms
        self.connection = vp.cylinder(
            pos=pos1,
            axis=pos2 - pos1,
            radius=0.1,
            color=color,
            opacity=0.5,
            emissive=True
        )
        
        # Flowing energy particles
        self.particles = []
        for i in range(10):
            t = i / 10.0
            particle_pos = pos1 + t * (pos2 - pos1)
            particle = vp.sphere(
                pos=particle_pos,
                radius=0.2,
                color=color,
                emissive=True
            )
            self.particles.append(particle)

def animate_cosmic_realms():
    """Animate the cosmic realms with spiritual energy"""
    t = 0
    
    while True:
        vp.rate(30)  # 30 FPS
        t += 0.02
        
        # Animate Òrun symbols - heavenly rotation
        if hasattr(orun, 'symbols'):
            for i, symbol in enumerate(orun.symbols):
                angle = t + i * 2 * math.pi / len(orun.symbols)
                symbol.pos = vp.vector(
                    orun.position.x + 6 * math.cos(angle),
                    orun.position.y + 2 * math.sin(angle * 0.5),
                    orun.position.z + 6 * math.sin(angle)
                )
        
        # Animate Ayé Orisha spheres - earthly dance
        if hasattr(aye, 'orisha_spheres'):
            for i, orisha_data in enumerate(aye.orisha_spheres):
                angle = t * 0.5 + i * 2 * math.pi / len(aye.orisha_spheres)
                new_pos = vp.vector(
                    aye.position.x + 8 * math.cos(angle),
                    aye.position.y + 3 * math.sin(angle * 2) + 2 * math.sin(t * 2),
                    aye.position.z + 8 * math.sin(angle)
                )
                orisha_data['sphere'].pos = new_pos
                orisha_data['label'].pos = new_pos + vp.vector(0, 1.5, 0)
        
        # Animate Ilẹ̀-Ọkùn water currents - oceanic flow
        if hasattr(ile_okun, 'water_currents'):
            for i, current in enumerate(ile_okun.water_currents):
                angle = t * 2 + i * 2 * math.pi / len(ile_okun.water_currents)
                current.pos = vp.vector(
                    ile_okun.position.x + 6 * math.cos(angle),
                    ile_okun.position.y + math.sin(angle * 3) + 0.5 * math.sin(t * 4),
                    ile_okun.position.z + 6 * math.sin(angle)
                )
        
        # Animate energy connections
        for connection in cosmic_connections:
            for i, particle in enumerate(connection.particles):
                t_particle = (t + i * 0.1) % 1.0
                start_pos = connection.connection.pos
                end_pos = start_pos + connection.connection.axis
                particle.pos = start_pos + t_particle * (end_pos - start_pos)

def create_sacred_geometry():
    """Add sacred geometric patterns"""
    # Sacred triangle connecting the three realms
    triangle_points = [orun.position, aye.position, ile_okun.position]
    
    for i in range(3):
        start = triangle_points[i]
        end = triangle_points[(i + 1) % 3]
        vp.cylinder(
            pos=start,
            axis=end - start,
            radius=0.05,
            color=COLORS['gold'],
            opacity=0.3
        )

def add_ancestral_paths():
    """Create the Ọ̀nà (Ancestral Paths) connecting all realms"""
    # Spiral path connecting all realms
    path_points = []
    for i in range(100):
        t = i / 100.0
        height = 20 * t - 10  # From -10 to 10
        radius = 15 * (1 - abs(height) / 15)  # Varies with height
        angle = t * 4 * math.pi
        
        point = vp.vector(
            radius * math.cos(angle),
            height,
            radius * math.sin(angle)
        )
        path_points.append(point)
        
        # Create ancestral light nodes
        if i % 10 == 0:
            vp.sphere(
                pos=point,
                radius=0.1,
                color=COLORS['silver'],
                emissive=True,
                opacity=0.7
            )

def main():
    """Main visualization function"""
    global orun, aye, ile_okun, cosmic_connections
    
    # Create title
    title_label = vp.label(
        pos=vp.vector(0, 18, 0),
        text="YORÙBÁ COSMIC REALMS\nÀwọn Àgbáyé Yorùbá",
        color=COLORS['gold'],
        height=30,
        opacity=1.0
    )
    
    # Instructions
    instructions = vp.label(
        pos=vp.vector(0, -18, 0),
        text="Use mouse to rotate • Scroll to zoom • Right-click and drag to pan\nExperience the sacred connection between Òrun, Ayé, and Ilẹ̀-Ọkùn",
        color=COLORS['white'],
        height=15,
        opacity=0.8
    )
    
    print("🌟 Creating Yorùbá Cosmic Realms...")
    
    # Create the three sacred realms
    orun = OrunRealm()
    print("✨ Òrun (Heavenly Realm) created")
    
    aye = AyeRealm()
    print("🌍 Ayé (Earthly Realm) created with floating Orisha spheres")
    
    ile_okun = IleOkunRealm()
    print("🌊 Ilẹ̀-Ọkùn (Oceanic Abyss) created")
    
    # Create cosmic connections
    cosmic_connections = []
    
    # Òrun ↔ Ayé connection (Divine-Earth bridge)
    orun_aye_connection = CosmicConnection(orun.position, aye.position, COLORS['gold'])
    cosmic_connections.append(orun_aye_connection)
    
    # Ayé ↔ Ilẹ̀-Ọkùn connection (Earth-Ocean bridge)
    aye_okun_connection = CosmicConnection(aye.position, ile_okun.position, COLORS['silver'])
    cosmic_connections.append(aye_okun_connection)
    
    # Òrun ↔ Ilẹ̀-Ọkùn connection (Heaven-Abyss bridge)
    orun_okun_connection = CosmicConnection(orun.position, ile_okun.position, COLORS['white'])
    cosmic_connections.append(orun_okun_connection)
    
    print("⚡ Cosmic energy connections established")
    
    # Add sacred geometry and ancestral paths
    create_sacred_geometry()
    add_ancestral_paths()
    
    print("📐 Sacred geometry and ancestral paths (Ọ̀nà) added")
    print("\n🎭 Yorùbá Cosmic Realms Visualization Active!")
    print("🔮 Watch the eternal dance of Orishas across the three sacred realms")
    print("💫 Each sphere represents an Orisha in their traditional domain")
    print("✨ The palm tree (Igi Ọ̀pẹ) serves as the cosmic bridge between all realms")
    
    # Start the animation
    animate_cosmic_realms()

if __name__ == "__main__":
    main()