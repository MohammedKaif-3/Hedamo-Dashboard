import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import ScoreCircle from "../components/ui/ScoreCircle";

const steps = ["Basic Info", "Ingredients", "Certifications", "Review"];

const AddProductPage = ({ theme }) => {
  const isDark = theme === "dark";
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    ingredients: [],
    certifications: [],
  });

  const [ingredient, setIngredient] = useState("");
  const [source, setSource] = useState("");
  const [cert, setCert] = useState("");
  const [aiFeedback, setAiFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const inputClass = `w-full p-3 rounded-lg border outline-none transition ${
    isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
  }`;

  const containerClass = `rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-lg ${
    isDark ? "bg-gray-900/70" : "bg-white/70"
  }`;

  const updateForm = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.productName.trim()) newErrors.productName = "Product name is required.";
      if (!formData.category.trim()) newErrors.category = "Category is required.";
      if (!formData.description.trim()) newErrors.description = "Description is required.";
    }
    if (step === 1 && formData.ingredients.length === 0) newErrors.ingredients = "Please add at least one ingredient.";
    if (step === 2 && formData.certifications.length === 0) newErrors.certifications = "Please add at least one certification.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => validateStep() && setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const addIngredient = () => {
    if (ingredient.trim() && source.trim()) {
      updateForm("ingredients", [...formData.ingredients, { name: ingredient, source }]);
      setIngredient("");
      setSource("");
      setErrors((e) => ({ ...e, ingredients: null }));
    }
  };

  const removeIngredient = (index) => updateForm("ingredients", formData.ingredients.filter((_, i) => i !== index));
  const addCert = () => {
    if (cert.trim()) {
      updateForm("certifications", [...formData.certifications, cert.trim()]);
      setCert("");
      setErrors((e) => ({ ...e, certifications: null }));
    }
  };
  const removeCert = (index) => updateForm("certifications", formData.certifications.filter((_, i) => i !== index));

  const handleSubmit = () => {
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 30) + 70;
      setScore(randomScore);
      setAiFeedback({
        summary: "Your product demonstrates strong ethical sourcing and clear transparency. However, supplier traceability can be improved further.",
        suggestions: [
          "List supplier certifications for higher credibility.",
          "Add lifecycle data for key raw materials.",
          "Consider carbon footprint disclosure for eco-conscious consumers.",
        ],
      });
      setStep(3);
    }, 800);
  };

  const stepVariants = { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 } };

  return (
    <div
      className={`min-h-[calc(100vh-70px)] flex flex-col transition-colors duration-300 ${
        isDark ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900 font-poppins"
      }`}
      style={{ maxHeight: "calc(100vh - 70px)", overflowY: "auto" }}
    >
      {/* Stepper */}
      <div
        className={`w-full overflow-x-auto border-b px-4 sm:px-6 py-4 flex justify-start sm:justify-center gap-4 sm:gap-16 backdrop-blur-md ${
          isDark ? "border-gray-800 bg-gray-900/60" : "border-gray-300 bg-white/60"
        }`}
      >
        {steps.map((label, index) => (
          <div key={label} className="flex flex-col items-center min-w-max text-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold mb-2 transition-all ${
                index === step ? "bg-green-600 text-white scale-110" : index < step ? "bg-green-500 text-white" : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"
              }`}
            >
              {index < step ? <FiCheckCircle /> : index + 1}
            </div>
            <span className={`text-sm ${index === step ? "font-semibold text-green-500" : "opacity-70"}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1: Basic Info */}
            {step === 0 && (
              <motion.div key="basic" variants={stepVariants} initial="initial" animate="animate" exit="exit" className={containerClass}>
                <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
                <div className="space-y-5">
                  <input type="text" placeholder="Product Name" value={formData.productName} onChange={(e) => updateForm("productName", e.target.value)} className={inputClass} />
                  {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
                  <input type="text" placeholder="Category" value={formData.category} onChange={(e) => updateForm("category", e.target.value)} className={inputClass} />
                  {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                  <textarea placeholder="Description" rows={4} value={formData.description} onChange={(e) => updateForm("description", e.target.value)} className={`${inputClass} resize-none`} />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Ingredients */}
            {step === 1 && (
              <motion.div key="ingredients" variants={stepVariants} initial="initial" animate="animate" exit="exit" className={containerClass}>
                <h2 className="text-2xl font-semibold mb-6">Ingredients</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
                  <input type="text" placeholder="Ingredient Name" value={ingredient} onChange={(e) => setIngredient(e.target.value)} className={`${inputClass} flex-1`} />
                  <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} className={`${inputClass} flex-1`} />
                  <button onClick={addIngredient} className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full sm:w-auto">
                    Add
                  </button>
                </div>
                {errors.ingredients && <p className="text-red-500 text-sm mb-3">{errors.ingredients}</p>}
                <div className="space-y-2">
                  {formData.ingredients.map((ing, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
                      <span className="break-words"><strong>{ing.name}</strong> — {ing.source}</span>
                      <button onClick={() => removeIngredient(idx)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Certifications */}
            {step === 2 && (
              <motion.div key="certs" variants={stepVariants} initial="initial" animate="animate" exit="exit" className={containerClass}>
                <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
                  <input type="text" placeholder="Add Certification..." value={cert} onChange={(e) => setCert(e.target.value)} className={`${inputClass} flex-1`} />
                  <button onClick={addCert} className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full sm:w-auto">
                    Add
                  </button>
                </div>
                {errors.certifications && <p className="text-red-500 text-sm mb-3">{errors.certifications}</p>}
                <div className="space-y-2">
                  {formData.certifications.map((c, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
                      <span className="break-words">{c}</span>
                      <button onClick={() => removeCert(idx)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Review + AI */}
            {step === 3 && (
              <motion.div key="review" variants={stepVariants} initial="initial" animate="animate" exit="exit" className={containerClass}>
                {aiFeedback ? (
                  <div className="flex flex-col items-center text-center space-y-4">
                    <h2 className="text-2xl font-semibold">AI Transparency Feedback</h2>
                    <ScoreCircle score={score} isDark={isDark} />
                    <p className="opacity-80">{aiFeedback.summary}</p>
                    <ul className="list-disc list-inside text-left opacity-90 space-y-1">
                      {aiFeedback.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mb-6">Review Details</h2>
                    <pre className={`p-4 rounded-lg text-sm overflow-auto max-h-64 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>{JSON.stringify(formData, null, 2)}</pre>
                    <button onClick={handleSubmit} className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full sm:w-auto">
                      Submit for AI Review
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step < 3 && (
            <div className="flex justify-between mt-6 flex-wrap gap-3">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`px-5 py-2 rounded-lg font-medium transition w-full sm:w-auto ${
                  step === 0 ? "opacity-50 cursor-not-allowed" : isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white shadow hover:bg-gray-50"
                }`}
              >
                Back
              </button>
              <button onClick={nextStep} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full sm:w-auto">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
