# DeliveryConnect UI Reference Guide

## 🎨 Color System

### Base Colors
```css
/* Backgrounds */
--bg-primary: bg-gray-900/80;    /* Main container background */
--bg-secondary: bg-gray-800/90;  /* Input/dropdown background */
--bg-hover: bg-gray-800;         /* Hover state */
--bg-active: bg-gray-700/50;     /* Active/selected state */

/* Borders */
--border-primary: border-gray-700;
--border-focus: border-blue-500;

/* Text */
--text-primary: text-white;
--text-secondary: text-gray-400;
--text-header: text-black;

/* Accents */
--accent-blue: bg-blue-500;      /* Primary actions */
--accent-green: bg-green-500;    /* Success/confirmation */
--accent-purple: bg-purple-500;  /* Secondary actions */
--accent-yellow: bg-yellow-500;  /* Warnings/important */
```

### Glass-morphism Effect
```css
/* Base container */
className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 
  shadow-lg transition-all duration-200 hover:bg-gray-900/90"
```

## 📐 Layout Structure

### Container Hierarchy
```jsx
<div className="space-y-8"> {/* Page container */}
  {/* Section Header */}
  <div className="flex items-center space-x-3 mb-8">
    <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
    <h2 className="text-2xl font-bold text-black">Section Title</h2>
    <Tooltip content="Helper text">
      <FiInfo className="w-5 h-5 text-gray-600 hover:text-gray-500 transition-colors" />
    </Tooltip>
  </div>

  {/* Content Sections */}
  <div className="space-y-6">
    {/* Individual Section */}
    <div className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 
      shadow-lg transition-all duration-200 hover:bg-gray-900/90">
      {/* Section content */}
    </div>
  </div>
</div>
```

### Spacing System
```css
/* Vertical Spacing */
--spacing-large: space-y-8;    /* Between major sections */
--spacing-medium: space-y-6;   /* Between related elements */
--spacing-small: space-y-4;    /* Between form elements */

/* Margins */
--margin-section: mb-8;        /* After section headers */
--margin-header: mb-6;         /* After content headers */
--margin-label: mb-2;          /* After labels */

/* Padding */
--padding-container: p-6;      /* Container padding */
--padding-input: p-3;          /* Input/control padding */
--padding-button: px-4 py-2;   /* Button padding */
```

## 🔤 Typography

### Text Styles
```css
/* Headers */
--header-primary: text-2xl font-bold;      /* Page headers */
--header-secondary: text-xl font-bold;      /* Section headers */
--header-tertiary: text-lg font-medium;     /* Subsection headers */

/* Body Text */
--text-body: text-base;                     /* Regular text */
--text-small: text-sm;                      /* Helper text */
--text-tiny: text-xs;                       /* Meta information */

/* Labels */
--label-primary: text-base font-medium;     /* Input labels */
--label-secondary: text-sm font-medium;     /* Secondary labels */
```

## 🎯 Interactive Elements

### Buttons
```css
/* Primary Button */
className="px-4 py-2 bg-blue-500 text-white rounded-lg 
  hover:bg-blue-600 focus:ring-2 focus:ring-blue-500/20 
  transition-colors duration-200"

/* Secondary Button */
className="px-4 py-2 bg-gray-800 text-white rounded-lg 
  hover:bg-gray-700 focus:ring-2 focus:ring-gray-500/20 
  border border-gray-700 transition-colors duration-200"
```

### Inputs
```css
/* Text Input */
className="w-full p-3 bg-gray-800/90 border border-gray-700 rounded-lg 
  text-white placeholder:text-gray-400 
  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
  hover:bg-gray-800 transition-colors"

/* Select Input */
className="w-full p-3 bg-gray-800/90 border border-gray-700 rounded-lg 
  text-white cursor-pointer
  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
  hover:bg-gray-800 transition-colors"
```

### Dropdowns
```css
/* Dropdown Container */
className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg mt-2
  divide-y divide-gray-700"

/* Dropdown Option */
className="px-4 py-2 text-white hover:bg-gray-700/50 cursor-pointer
  first:rounded-t-lg last:rounded-b-lg"
```

### Checkboxes
```css
/* Checkbox Container */
className="flex items-center space-x-3 p-2 rounded-lg transition-colors
  hover:bg-gray-700/50 group cursor-pointer"

/* Checkbox Input */
className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
  focus:ring-blue-500/20 focus:ring-offset-0"
```

## 🎁 Components

### Section Headers
```jsx
<div className="flex items-center space-x-3 mb-6">
  <div className="w-1.5 h-8 bg-[color]-500 rounded-full" />
  <h3 className="text-xl font-bold text-white">Section Title</h3>
  <Tooltip content="Helper text">
    <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
  </Tooltip>
</div>
```

### Form Groups
```jsx
<div className="space-y-4">
  <div className="flex items-center space-x-1 mb-2">
    <label className="text-base font-medium text-white">Label</label>
    <Tooltip content="Helper text">
      <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
    </Tooltip>
  </div>
  {/* Form control */}
</div>
```

### Cards
```jsx
<div className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 
  shadow-lg transition-all duration-200 hover:bg-gray-900/90">
  {/* Card content */}
</div>
```

## 🎭 Animations & Transitions

### Standard Transitions
```css
/* Base transition */
transition-all duration-200

/* Hover transition */
hover:bg-gray-800 transition-colors

/* Focus transition */
focus:ring-2 focus:ring-blue-500/20 transition-colors
```

### Interactive States
```css
/* Hover states */
hover:bg-gray-800        /* Inputs */
hover:bg-gray-700/50     /* Options */
hover:bg-gray-900/90     /* Containers */

/* Focus states */
focus:border-blue-500
focus:ring-2 
focus:ring-blue-500/20
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile first approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

### Grid System
```css
/* Basic grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

/* Two column layout */
grid grid-cols-2 gap-6
```

## 🛠 Usage Examples

### Complete Form Section
```jsx
<div className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 
  shadow-lg transition-all duration-200 hover:bg-gray-900/90">
  {/* Section Header */}
  <div className="flex items-center space-x-3 mb-6">
    <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
    <h3 className="text-xl font-bold text-white">Section Title</h3>
    <Tooltip content="Helper text">
      <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
    </Tooltip>
  </div>

  {/* Form Content */}
  <div className="space-y-6">
    {/* Input Group */}
    <div className="space-y-4">
      <div className="flex items-center space-x-1 mb-2">
        <label className="text-base font-medium text-white">Input Label</label>
        <Tooltip content="Helper text">
          <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
        </Tooltip>
      </div>
      <input
        type="text"
        className="w-full p-3 bg-gray-800/90 border border-gray-700 rounded-lg 
          text-white placeholder:text-gray-400 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
          hover:bg-gray-800 transition-colors"
        placeholder="Enter value..."
      />
    </div>

    {/* Checkbox Group */}
    <div className="space-y-3">
      <label className="flex items-center space-x-3 p-2 rounded-lg transition-colors
        hover:bg-gray-700/50 group cursor-pointer">
        <input
          type="checkbox"
          className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
            focus:ring-blue-500/20 focus:ring-offset-0"
        />
        <span className="text-base text-white group-hover:text-blue-300 transition-colors">
          Checkbox Label
        </span>
      </label>
    </div>
  </div>
</div>
```

## 🎯 Best Practices

1. **Consistency**
   - Use the defined color system consistently
   - Maintain consistent spacing
   - Use the same component patterns

2. **Accessibility**
   - Include tooltips for helper text
   - Use proper ARIA labels
   - Maintain good color contrast

3. **Responsiveness**
   - Design mobile-first
   - Use responsive grid layouts
   - Test on different screen sizes

4. **Performance**
   - Use transition-all sparingly
   - Optimize images and assets
   - Minimize DOM nesting

5. **Maintainability**
   - Use semantic class names
   - Follow component patterns
   - Keep styles modular

## 🔄 How to Use This Guide

1. **For New Pages**
   - Start with the basic container structure
   - Add appropriate section headers
   - Use the component patterns for forms and content
   - Apply consistent spacing and styling

2. **For Existing Pages**
   - Identify components that need updating
   - Apply the appropriate styles from this guide
   - Ensure consistency with other pages
   - Test all interactive elements

3. **For Components**
   - Reference the component patterns
   - Use the defined color system
   - Apply consistent spacing
   - Include appropriate transitions

4. **For Styling Updates**
   - Reference the color system
   - Use the defined spacing system
   - Apply consistent typography
   - Include appropriate animations