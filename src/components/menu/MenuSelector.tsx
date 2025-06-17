import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuSelection } from '@/hooks/useMenuSelection';

// ... (previous interfaces and types remain the same)

const MenuSelector: React.FC<MenuSelectorProps> = ({
  proteins,
  sides,
  onSelectionComplete,
  maxProteins = 3,
  maxSides = 4
}) => {
  // ... (previous state and hooks remain the same)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Progress Steps - Enhanced mobile display */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <div className={`flex items-center ${step === 'proteins' ? 'text-ph-purple' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'proteins' ? 'bg-ph-purple text-white' : 'bg-gray-200'
            }`}>1</span>
            <span className="ml-2 font-medium text-sm sm:text-base">Select Proteins</span>
          </div>
          <div className="w-8 sm:w-16 h-1 bg-gray-200">
            <div className={`h-full bg-ph-purple transition-all duration-300 ${
              step === 'sides' ? 'w-full' : 'w-0'
            }`}></div>
          </div>
          <div className={`flex items-center ${step === 'sides' ? 'text-ph-purple' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'sides' ? 'bg-ph-purple text-white' : 'bg-gray-200'
            }`}>2</span>
            <span className="ml-2 font-medium text-sm sm:text-base">Choose Sides</span>
          </div>
        </div>
      </div>

      {/* Selection Area - Enhanced touch targets */}
      <AnimatePresence mode="wait">
        {step === 'proteins' ? (
          <motion.div
            key="proteins"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {proteins.map((protein) => (
              <motion.div
                key={protein.id}
                variants={itemVariants}
                className={`p-4 sm:p-6 rounded-lg border-2 transition-all touch-manipulation ${
                  isProteinSelected(protein.id)
                    ? 'border-ph-purple bg-ph-light'
                    : 'border-gray-200 hover:border-ph-purple'
                }`}
                onClick={() => {
                  if (isProteinSelected(protein.id)) {
                    removeProtein(protein.id);
                  } else if (canAddProtein()) {
                    addProtein(protein.id);
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-ph-purple">{protein.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{protein.description}</p>
                  </div>
                  <span className="text-ph-gold font-bold ml-4">{protein.price}</span>
                </div>
                {isProteinSelected(protein.id) && (
                  <span className="text-ph-purple text-sm font-medium mt-2 block">✓ Selected</span>
                )}
              </motion.div>
            ))}
            {errors.proteins && (
              <p className="text-red-500 text-sm mt-2 col-span-full">{errors.proteins}</p>
            )}
            {selectedProteins.length > 0 && (
              <motion.button
                className="btn btn-primary mt-4 sm:mt-6 col-span-full min-h-[44px]"
                onClick={() => setStep('sides')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Sides ({selectedProteins.length} selected)
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="sides"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {sides.map((side) => (
              <motion.div
                key={side.id}
                variants={itemVariants}
                className={`p-4 sm:p-6 rounded-lg border-2 transition-all ${
                  isSideSelected(side.id)
                    ? 'border-ph-purple bg-ph-light'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-ph-purple">{side.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{side.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-ph-gold font-bold">Half: {typeof side.price === 'number' ? `$${side.price/2}` : side.price}</div>
                    <div className="text-ph-gold font-bold">Full: {side.price}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {!isSideSelected(side.id) ? (
                    canAddSide() && (
                      <>
                        <button
                          className="flex-1 px-3 py-2 text-sm font-medium rounded bg-ph-purple text-white hover:bg-ph-dark min-h-[44px]"
                          onClick={() => addSide(side.id, 'half')}
                        >
                          Add Half Pan
                        </button>
                        <button
                          className="flex-1 px-3 py-2 text-sm font-medium rounded bg-ph-purple text-white hover:bg-ph-dark min-h-[44px]"
                          onClick={() => addSide(side.id, 'full')}
                        >
                          Add Full Pan
                        </button>
                      </>
                    )
                  ) : (
                    <div className="flex flex-wrap gap-2 w-full">
                      <span className="text-ph-purple text-sm font-medium py-2">
                        {getSideSize(side.id) === 'half' ? 'Half Pan' : 'Full Pan'} Selected
                      </span>
                      <div className="flex gap-2 flex-1 justify-end">
                        <button
                          className="px-3 py-2 text-sm font-medium rounded bg-red-500 text-white hover:bg-red-600 min-h-[44px]"
                          onClick={() => removeSide(side.id)}
                        >
                          Remove
                        </button>
                        <button
                          className="px-3 py-2 text-sm font-medium rounded bg-ph-purple text-white hover:bg-ph-dark min-h-[44px]"
                          onClick={() => updateSideSize(side.id, getSideSize(side.id) === 'half' ? 'full' : 'half')}
                        >
                          Switch to {getSideSize(side.id) === 'half' ? 'Full' : 'Half'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {errors.sides && (
              <p className="text-red-500 text-sm mt-2 col-span-full">{errors.sides}</p>
            )}
            <div className="col-span-full flex flex-col sm:flex-row justify-between gap-4 mt-4 sm:mt-6">
              <button
                className="btn btn-secondary order-2 sm:order-1 min-h-[44px]"
                onClick={() => setStep('proteins')}
              >
                Back to Proteins
              </button>
              {selectedSides.length > 0 && (
                <button
                  className="btn btn-primary order-1 sm:order-2 min-h-[44px]"
                  onClick={handleComplete}
                >
                  Complete Selection ({selectedSides.length} sides)
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary - Enhanced mobile layout */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-bold text-ph-purple mb-4">Your Selections</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Selected Proteins ({selectedProteins.length}/{maxProteins})</h5>
            <ul className="space-y-1">
              {selectedProteins.map(id => {
                const protein = proteins.find(p => p.id === id);
                return protein ? (
                  <li key={id} className="text-sm text-gray-600">• {protein.name}</li>
                ) : null;
              })}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Selected Sides ({selectedSides.length}/{maxSides})</h5>
            <ul className="space-y-1">
              {selectedSides.map(({ id, size }) => {
                const side = sides.find(s => s.id === id);
                return side ? (
                  <li key={id} className="text-sm text-gray-600">• {side.name} ({size} pan)</li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSelector;