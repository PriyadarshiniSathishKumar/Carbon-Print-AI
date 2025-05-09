
import React from "react";
import { useCarbonContext } from "@/contexts/CarbonContext";
import Header from "@/components/Header";
import UserForm from "@/components/UserForm";
import TransportForm from "@/components/TransportForm";
import DietForm from "@/components/DietForm";
import HomeForm from "@/components/HomeForm";
import ShoppingForm from "@/components/ShoppingForm";
import ResultsDisplay from "@/components/ResultsDisplay";

const Index: React.FC = () => {
  const { currentStep, resetData } = useCarbonContext();

  // Function to render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <UserForm />;
      case 1:
        return <TransportForm />;
      case 2:
        return <DietForm />;
      case 3:
        return <HomeForm />;
      case 4:
        return <ShoppingForm />;
      case 5:
        return (
          <div className="w-full px-4">
            <ResultsDisplay />
          </div>
        );
      default:
        return <UserForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-light to-white">
      <Header onReset={currentStep > 0 ? resetData : undefined} />
      
      <main className="container mx-auto py-8">
        {currentStep < 5 && (
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-full max-w-xl px-4">
                <div className="flex items-center justify-between">
                  {[0, 1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                      <div 
                        className={`h-10 w-10 rounded-full flex items-center justify-center
                          ${currentStep >= step 
                            ? 'bg-eco-primary text-white' 
                            : 'bg-eco-light text-eco-dark border border-eco-primary'
                          }
                        `}
                      >
                        {step + 1}
                      </div>
                      {step < 4 && (
                        <div 
                          className={`flex-1 h-1 mx-2 
                            ${currentStep > step ? 'bg-eco-primary' : 'bg-eco-light'}
                          `}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
                  <div>Profile</div>
                  <div>Transport</div>
                  <div>Diet</div>
                  <div>Home</div>
                  <div>Shopping</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {renderCurrentStep()}
        </div>
      </main>
      
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 CarbonPrint AI - Making a difference, one footprint at a time</p>
      </footer>
    </div>
  );
};

export default Index;
