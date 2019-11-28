
# react-native-todo-list

## Getting started

`$ npm install react-native-todo-list --save`

### Mostly automatic installation

`$ react-native link react-native-todo-list`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-todo-list` and add `RNTodoList.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNTodoList.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNTodoListPackage;` to the imports at the top of the file
  - Add `new RNTodoListPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-todo-list'
  	project(':react-native-todo-list').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-todo-list/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-todo-list')
  	```


## Usage
```javascript
import RNTodoList from 'react-native-todo-list';

// TODO: What to do with the module?
RNTodoList;
```
  