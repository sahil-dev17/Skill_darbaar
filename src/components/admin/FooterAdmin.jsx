import React from 'react'

function FooterAdmin() {
  return (
      <footer className="fixed bottom-0 left-0 w-full bg-black text-white text-center py-3 text-sm z-10">
      © {new Date().getFullYear()} Skill Darbar. All rights reserved.
    </footer>
  )
}

export default FooterAdmin