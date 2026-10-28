/*
 * Copyright 2012 Orient Technologies.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.orientechnologies.orient.graph.sql.functions;

import com.orientechnologies.orient.core.exception.OCommandExecutionException;
import com.orientechnologies.orient.core.sql.functions.OSQLFunction;
import com.orientechnologies.orient.core.sql.functions.OSQLFunctionFactory;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/**
 * 
 * @author Johann Sorel (Geomatys)
 * @module pending
 */
public class OGraphFunctionFactory implements OSQLFunctionFactory {

  private static final Map<String, Object> FUNCTIONS = new HashMap<String, Object>();
  static {
    register(OSQLFunctionGremlin.NAME, OSQLFunctionGremlin.class);
    register(OSQLFunctionDijkstra.NAME, new OSQLFunctionDijkstra());
    register(OSQLFunctionShortestPath.NAME, new OSQLFunctionShortestPath());

    register(OSQLFunctionLabel.NAME, new OSQLFunctionLabel());
    register(OSQLFunctionOut.NAME, new OSQLFunctionOut());
    register(OSQLFunctionIn.NAME, new OSQLFunctionIn());
    register(OSQLFunctionBoth.NAME, new OSQLFunctionBoth());
    register(OSQLFunctionOutE.NAME, new OSQLFunctionOutE());
    register(OSQLFunctionInE.NAME, new OSQLFunctionInE());
    register(OSQLFunctionBothE.NAME, new OSQLFunctionBothE());
    register(OSQLFunctionOutV.NAME, new OSQLFunctionOutV());
    register(OSQLFunctionInV.NAME, new OSQLFunctionInV());
    register(OSQLFunctionBothV.NAME, new OSQLFunctionBothV());
  }

  public static void register(final String iName, final Object iImplementation) {
    FUNCTIONS.put(iName.toLowerCase(Locale.ENGLISH), iImplementation);
  }

  public Set<String> getFunctionNames() {
    return FUNCTIONS.keySet();
  }

  public boolean hasFunction(final String name) {
    return FUNCTIONS.containsKey(name.toLowerCase());
  }

  public OSQLFunction createFunction(final String name) {
    final Object obj = FUNCTIONS.get(name.toLowerCase());

    if (obj == null)
      throw new OCommandExecutionException("Unknown function name :" + name);

    if (obj instanceof OSQLFunction)
      return (OSQLFunction) obj;
    else {
      // it's a class
      final Class<?> clazz = (Class<?>) obj;
      try {
        return (OSQLFunction) clazz.newInstance();
      } catch (Exception e) {
        throw new OCommandExecutionException("Error in creation of function " + name
            + "(). Probably there is not an empty constructor or the constructor generates errors", e);
      }
    }
  }
}
